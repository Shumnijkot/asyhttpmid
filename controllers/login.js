import passport from "passport";

const login = function(req, res, next) {
    passport.authenticate('local',
      function(err, user, info) {
        return err 
          ? next(err)
          : user
            ? req.logIn(user, function(err) {
                if(err) {
                  return next(err)
                }
                return res.redirect('/');
              })
            : res.redirect('/');
      }
    )(req, res, next);
  };
export default login;