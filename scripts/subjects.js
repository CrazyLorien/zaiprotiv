var subjects = {
   templateUrl:"../partial-views/subject.html",
   controller: function () {
       this.showSelected = function (node) {
           console.log("azaza");
       }

       this.showSelected = function (node){
          $(node).toogle();
       }

       this.treedata = [
        { "roleName" : "User", "id" : "role1", "children" : [
          { "roleName" : "subUser1", "id" : "role11", "children" : [] },
          { "roleName" : "subUser2", "id" : "role12", "children" : [
            { "roleName" : "subUser2-1", "id" : "role121", "children" : [
              { "roleName" : "subUser2-1-1", "id" : "role1211", "children" : [] },
              { "roleName" : "subUser2-1-2", "id" : "role1212", "children" : [] }
            ]}
          ]}
        ]},

        { "roleName" : "Admin", "id" : "role2", "children" : []},

        { "roleName" : "Guest", "id" : "role3", "children" : [] }
      ];
   }
}

module.exports = subjects;

