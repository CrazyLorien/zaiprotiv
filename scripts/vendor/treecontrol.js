
 module.exports =  {
                restrict: 'E',
                transclude: true,
                bindings: {
                    treeModel: "=",
                    selectedNode: "=",
                    onSelection: "&",
                    nodeChildren: "@"
                },
                templateUrl: "../../partial-views/treeControlTemplate.html",  
                controller: function($location) {
                    this.nodeChildren = this.nodeChildren || 'children';
                    this.expandedNodes = {};

                    this.headClass = function(node) {
                        if (node[this.nodeChildren].length && !this.expandedNodes[node.id])
                            return "tree-collapsed";
                        else if (node[this.nodeChildren].length && this.expandedNodes[node.id])
                            return "tree-expanded";
                        else
                            return "tree-normal"
                    };

                    this.nodeExpanded = function() {
                        return this.expandedNodes[this.$id];
                    };

                    this.selectNodeHead = function(node ) {                   
                        this.expandedNodes[node.id] = !this.expandedNodes[node.id];
                    };
                    var self = this;
                    this.selectNodeLabel = function( selectedNode, $event ){
                        $event.stopPropagation();
                        self.selectedScope = selectedNode.id;
                        self.selectedNode = selectedNode;
                        if (self.onSelection)
                            self.onSelection({node: selectedNode});
                        if(!selectedNode[self.nodeChildren].length)
                            $location.path("/main/subject/" + selectedNode.id)
                        
                    };

                    this.selectedClass = function(node) {
                        return (node.id == self.selectedScope) ? "tree-selected" : "";
                    };
                 
                }
            };
            
