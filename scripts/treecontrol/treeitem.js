//for now it is jusst for ability extension our tree control
module.exports = {
                bindings: {
                    nodes: '=node'
                },
                template: '<div>{{$ctrl.nodes.Category || $ctrl.nodes.description}}</div>',
                controller : function () {}
            }

        
        
 