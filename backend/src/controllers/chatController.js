

export async function getStreamToken(req,res) {
    try {
        //use clerkId for stream not mongodbId => it should match the id we have in the stream dashboard
        const token = chatClient.createToken(req.user.clerkId)

        res.statuc(200).json({
            token,
            userId:req.user.clerkId,
            userName: user.user.name,
            userImage: req.user.image
        })
    } catch (error) {
        console.log("Error in getStreamToken controller:", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}