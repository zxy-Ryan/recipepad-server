import model from "./model.js";
import saveModel from "./saveModel.js";
export const createComment = (comment) => model.create(comment);
export const findAllComment = () => model.find();
export const findCommentByCommentId = (commentId) => model.findById(commentId);
export const findCommentByUserId = (userId) => model.find({ userId: userId });
export const findCommentByRecipeId = (recipeId) => model.find({ recipeId: recipeId });
export const deleteComment = (commentId) => model.deleteOne({ _id: commentId });





// export const findSaveByUserId = (userId) => saveModel.findOne({ userId: userId });


export const findSaveByUserId = async (userId) => {
    try {
      let saveData = await saveModel.findOne({ userId: userId });
  
      if (!saveData) {
        saveData = await saveModel.create({
          userId: userId,
          saveRecipe:['']
        });
      }
  
      return saveData;
    } catch (error) {
      console.error('Error finding or creating save data:', error);
      throw error; // 可以根据需要处理错误
    }
  };


// export const findSavedRecipeUsers = (recipeId) => saveModel.find({ recipeId });
export const deleteByUserId = (userId) => saveModel.deleteOne({ _id: userId });
export const updateSaveByUserId = (user) => saveModel.create(user);

// 获取整张表的所有文档
// 获取每个userId对应的完整文档信息
// 获取整个集合的内容
// export const findSavedRecipeUsers = async () => {
//     try {
//       const allSavedRecords = await saveSchema.find({}, 'userId saveRecipe', function(err, docs) {
//         // docs 是查询结果
//       });
//       return allSavedRecords;
//     } catch (error) {
//       console.error('Error fetching all saved records:', error);
//       throw new Error('Error fetching all saved records: ' + error.message);
//     }
//   };
  
// 根据 recipeId 查询对应的 userId
// export const findUsersByRecipeId = async (recipeId) => {
//     try {
//       const usersWithRecipe = await saveModel.findOne({ saveRecipe: recipeId });
//       return usersWithRecipe.map(user => user.userId);
//     } catch (error) {
//       console.error('Error finding users by recipeId:', error);
//       throw new Error('Error finding users by recipeId: ' + error.message);
//     }
//   };
// export const findSavedRecipeUsers = async () => {
//     try {
//       const allSavedRecords = await saveSchema.find({}, 'userId saveRecipe');
//       return allSavedRecords;
//     } catch (error) {
//       console.error('Error fetching all saved records:', error);
//       throw new Error('Error fetching all saved records: ' + error.message);
//     }
//   };
  
  
// 根据 recipeId 查询对应的 userId
export const findUsersByRecipeId = async (recipeId) => {
    try {
      const usersWithRecipe = await saveModel.find({ saveRecipe: { $in: [recipeId] } }, 'userId');
      return usersWithRecipe.map(user => user.userId);
    } catch (error) {
      console.error('Error finding users by recipeId:', error);
      throw new Error('Error finding users by recipeId: ' + error.message);
    }
  };
  
  
