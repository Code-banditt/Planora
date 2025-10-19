import connectDB from "@/libs/mongodb";
import Conversation from "@/models/convoModel";
import Message from "@/models/messageModel";
import { NextResponse } from "next/server";

/**
 * @desc Create or send a message
 * @route POST /api/message/post
 */
export async function POST(req: Request) {
  try {
    await connectDB();
    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Save message
    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId,
      receiverId,
      content,
    });

    // Update conversation with last message
    conversation.lastMessage = newMessage._id;
    await conversation.save();

    return NextResponse.json(
      { success: true, message: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

/**
 * @desc Get messages by conversation ID
 * @route GET /api/message/get?conversationId=xxx
 */
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: "Missing conversationId" },
        { status: 400 }
      );
    }

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });
    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

/**
 * @desc Delete a message by ID
 * @route DELETE /api/message/delete?id=xxx
 */
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing message ID" },
        { status: 400 }
      );
    }

    await Message.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
