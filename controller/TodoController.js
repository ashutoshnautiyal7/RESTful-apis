
/// here we'll create our controller functions --basically the functions that control our api

const asyncHandler = require("express-async-handler")


//importing model of our schema
const Goal = require("../model/goalsModel")

// importing user model here 


const getTodos = asyncHandler(async(req, res)=> {

    const todos = await Todo.find();

	res.json(todos);
})


const postTodo = asyncHandler(async(req, res)=> {

    const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
} )


// updating 
const putTodo =asyncHandler(async(req, res)=> {

    const goal = await Goal.findById(req.params.id)
    
    

    if(!goal) {
        res.status(400) 
        throw new Error('goal not found')
    }

    //                                  -------------------------------------------
    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found ')
    }

    //we'll be making sure that logged

    if( goal.user.toString() !== user.id) {              // note: while posing goal we assigned goal's user as req.user.id so so goal.user contains requested user's id
        res.status(401)
        throw new Error('user not authorised')
    }

    //                        ------------------------------------------------------------------

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)

    // res.json({'message': `updated goal ${req.params.id}`})
})

const deleteGoals = asyncHandler(async(req, res)=> {

    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('id not found')
    }

    const user = await User.findById(req.user.id)           // same thing is done with deleteGoals as done with postGoals

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found ')
    }

    //we'll be making sure that logged

    if( goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorised')
    }



    
    // const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    // res.status(200).json(deletedGoal)

    await goal.remove()

    res.json({ id: req.params.id })
})

module.exports = { 
    getGoals,
    postGoals,
    putGoals,
    deleteGoals
}


// so yeah that's all for api / we're done with this 
