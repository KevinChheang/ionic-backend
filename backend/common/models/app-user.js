'use strict';

module.exports = function(Appuser) {
    // Adding the property token to the response we get on a succesful login
    Appuser.afterRemote('login', async(ctx, user, next) =>{
        if (user) {
            user.token = user.id;
        }
   })

   // Modify our register endpoint so we can register and receive a token in the same step
   Appuser.observe('after save', function(ctx, next) {
    if (ctx.isNewInstance === true) {
      var instance = ctx.instance;
       instance.createAccessToken(1209600000, function(err, response){
          if (err === null) {
             ctx.instance['userId'] = response.userId
             ctx.instance["token"] = response.id;
           }
            next();
         });
          }
          else {
              next();
          }
      });
};
