// import comments from "./comments.json" assert { type: "json" };
import * as dao from "./dao.js";

let currentRecipe = null;
function CommentRoutes(app) {
    const findCommentByRecipeId = async (req, res) => {
        const { recipeId } = req.params;
        // const commentsForRecipe = comments.filter(comment => comment.recipeId == recipeId);
        const commentsForRecipe = await dao.findCommentByRecipeId(recipeId);
        res.json({ comments: commentsForRecipe }); 
    };

    const findCommentByCommentId = async (req, res) => {
        const { commentId } = req.params;
        // const commentSingle = comments.filter(comment => comment._id == commentId);
        const commentSingle = await dao.findCommentByCommentId(commentId);
        res.json({ comments: commentSingle }); 
     };
    const findCommentByUserId = async (req, res) => { 
        const { userId } = req.params;
        const commentForUser = await dao.findCommentByUserId(userId);
        res.json({ comments: commentForUser }); 
    };

    const createComment = async (req, res) => {
        console.log("11111111")
        console.log(req);
        const comment = await dao.createComment(req.body);
        console.log(comment);
        res.json(comment);
     };





    
    // const findAllComment = async (req, res) => { };
    
    const deleteComment = async (req, res) => { 
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };


    const findSavedRecipe = async (req, res) => { 
        const { userId } = req.params;
        // console.log("backend"+userId);
        const userSavedRecipe = await dao.findSaveByUserId(userId);
        res.json({ user: userSavedRecipe}); 
    };

    // const updateSavedRecipe = async (req, res) => { 
    //     const { userId } = req.params;

    //     const { user } = req.body;
    //     const status_delete = dap.deleteByUserId(userId);
    //     const status_create = dao.updateSaveByUserId(user);
    //     const userSavedRecipe = await dao.findSaveByUserId(userId);
    //     res.json({ user: userSavedRecipe}); 
    // };

    const updateSavedRecipe = async (userId, updatedRecipeArray) => { 
        try {
            // 找到对应 userId 的用户记录
            // console.log("backend ")
            // const user = await findSaveByUserId({ userId });
            // const user = await findSaveByUserId(userId);
            // console.log(user)
            // try {
            //     const user = await dao.findSaveByUserId(userId);
            //     console.log(user);
            //   } catch (error) {
            //     console.error('Error fetching user:', error);
            //   }
            const user = await dao.findSaveByUserId(userId);
            console.log(user);
            if (user) {
                
                console.log("backend ")
                user.saveRecipe = updatedRecipeArray;
    
               
                console.log("backend " + user)
                await user.save();
    
                return { success: true, message: 'Save recipe array updated successfully' };
            } else {
                console.log("failed")
                return { success: false, message: 'User not found' };
            }
        } catch (error) {
            return { success: false, message: 'Failed to update save recipe array', error };
        }
    };


app.get('/likes/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params;

      const likedUsers = await dao.findSavedRecipeUsers(recipeId);
      console.log("I am here")
        console.log(likedUsers)
      const userIds = likedUsers.map(like => like.userId);
        
      res.status(200).json(userIds);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve liked users' });
    }
  }); 
    
    app.post("/api/comments", createComment);
    // app.get("/api/comments", findAllComment);
    app.get("/api/comments/:recipeId", findCommentByRecipeId);
    app.get("/api/comments/:commentId", findCommentByCommentId);
    app.get("/api/comments/user/:userId", findCommentByUserId);
    
    app.delete("/api/comments/:commentId", deleteComment);
    app.get("/api/comments/saved/:userId", findSavedRecipe);
    // app.post("/api/comments/update/", updateSavedRecipe);
    app.put("/update/:userId", async (req, res) => {
        const { userId } = req.params;
        const updatedRecipeArray = req.body;
        console.log(userId)
        console.log(updatedRecipeArray)
        try {
            // console.log("backend")
            // console.log(userId)
            // console.log(updatedRecipeArray)
          const result = await updateSavedRecipe(userId, updatedRecipeArray);
          res.json(result);
        } catch (error) {
          res.status(500).json({ success: false, message: 'Failed to update save recipe array', error });
        }
      });

    //   app.get('/getUserName/:userId', async (req, res) => {
    //     const { userId } = req.params;
      
    //     try {
    //       // 查询数据库以获取特定用户信息
    //       const user = await User.findById(userId); // 假设使用 Mongoose 查询用户信息
      
    //       if (!user) {
    //         return res.status(404).json({ message: 'User not found' });
    //       }
      
    //       // 返回用户信息
    //       res.json({ username: user.username, /* 其他用户信息 */ });
    //     } catch (error) {
    //       res.status(500).json({ message: 'Error fetching user', error });
    //     }
    //   });
      




   
  
}
export default CommentRoutes;





