const prisma = require("./../DB/db.config");

exports.createPost = async (req, res) => {
    try {
        const { title, description, authorId } = req.body;

        // Validate inputs
        if (!title || !description || !authorId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Title, description, and authorId are required.'
            });
        }

        // Create a new post
        const newPost = await prisma.post.create({
            data: { title, description, authorId }
        });

        return res.status(201).json({
            status: 'created',
            data: newPost
        });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({
            status: 'fail',
            message: 'An error occurred while creating the post.',
            err_details:error
        });
    }
};
