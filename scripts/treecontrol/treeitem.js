//for now it is jusst for ability extension our tree control
module.exports = {
                bindings: {
                    nodes: '=node'
                },
                template: '<div>{{$ctrl.nodes.Category || $ctrl.nodes.subject}}</div>',
                controller : function () {}
            }

        
        
 