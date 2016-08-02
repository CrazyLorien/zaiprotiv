var subjects = {
   templateUrl:"../partial-views/subjects.html",
   controller: function () {

       this.treedata = [
        { "Category" : "Selection",  "id" : "role1", "children" : [
          { "Category" : "car selection", "id" : "role11", "children" : [] },
          { "Category" : "cell phone selection", "id" : "role12", "children" : [
            { "Category" : "iPhone", "id" : "role121", "children" : [
              { "subject" : "iPhone3", "id" : "role1211", "children" : [] , arguments : { pro : ["Stive Jobs", "It is cool", "You'll have a community friendly dudes", "All other are stuff"], cons : ["It is too expensive", "It is about pop culture", "My girl have one"]}},
              { "subject" : "iPhone4", "id" : "role1212", "children" : [] }
            ]}
          ]}
        ]},

        { "subject" : "Woman", "id" : "role2", "children" : []},

        { "subject" : "Woodman", "id" : "role3", "children" : [] }
      ];
   }
}

module.exports = subjects;

