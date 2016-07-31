
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
                controller: function() {
                    this.nodeChildren = this.nodeChildren || 'children';
                    this.expandedNodes = {};

                    this.headClass = function(node) {
                        if (node[this.nodeChildren].length && !this.expandedNodes[this.$id])
                            return "tree-collapsed";
                        else if (node[this.nodeChildren].length && this.expandedNodes[this.$id])
                            return "tree-expanded";
                        else
                            return "tree-normal"
                    };

                    this.nodeExpanded = function() {
                        return this.expandedNodes[this.$id];
                    };

                    this.selectNodeHead = function() {
                        this.expandedNodes[this.$id] = !this.expandedNodes[this.$id];
                    };

                    this.selectNodeLabel = function( selectedNode ){
                        this.selectedScope = this.$id;
                        this.selectedNode = selectedNode;
                        if (this.onSelection)
                            this.onSelection({node: selectedNode});
                    };

                    this.selectedClass = function() {
                        return (this.$id == this.selectedScope)?"tree-selected":"";
                    };
                 
                }
            };
            
