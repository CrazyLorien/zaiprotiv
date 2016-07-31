var subjects = {
   templateUrl:"../partial-views/subject.html",
   controller: function () {
       this.showSelected = function (node) {
           console.log("azaza");
       }

       this.treedata = [
        { "roleName" : "User", "roleId" : "role1", "children" : [
          { "roleName" : "subUser1", "roleId" : "role11", "children" : null },
          { "roleName" : "subUser2", "roleId" : "role12", "children" : [
            { "roleName" : "subUser2-1", "roleId" : "role121", "children" : [
              { "roleName" : "subUser2-1-1", "roleId" : "role1211", "children" : null },
              { "roleName" : "subUser2-1-2", "roleId" : "role1212", "children" : null }
            ]}
          ]}
        ]},

        { "roleName" : "Admin", "roleId" : "role2", "children" : null},

        { "roleName" : "Guest", "roleId" : "role3", "children" : null }
      ];
   }
}

module.exports = subjects;

