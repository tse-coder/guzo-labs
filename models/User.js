import mongoose from 'mongoose';

const userTaskProgressSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['not-started', 'in-progress', 'completed', 'redeemed'],
        default: 'in-progress',
        index: true,
    },
    completedAt: {
        type: Date,
    },
    redeemedAt: {
        type: Date,
    },
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: function() { return !this.providerId; },
        select: false,
    },
    authProvider: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local',
    },
    providerId: {
        type: String,
        unique: true,
        sparse: true,
    },
    avatarUrl: {
        type: String,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        index: true,
    },
    currentTier: {
        name: {
            type: String,
            default: 'Bronze',
        },
        icon: {
            type: String,
        },
        achievedAt: {
            type: Date,
        },
    },
    tasks: [userTaskProgressSchema],
    preferences: {
        receiveNewsletter: { type: Boolean, default: false },
        pushNotificationsEnabled: { type: Boolean, default: false },
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
}, { timestamps: true });

userSchema.index({ 'tasks.taskId': 1 });

userSchema.methods.updateTaskStatus = async function(taskIdToUpdate, newStatus) {
    const taskIndex = this.tasks.findIndex(t => t.taskId.equals(taskIdToUpdate));
    if (taskIndex > -1) {
        this.tasks[taskIndex].status = newStatus;
        if (newStatus === 'completed' && !this.tasks[taskIndex].completedAt) {
            this.tasks[taskIndex].completedAt = new Date();
        }
        if (newStatus === 'redeemed' && !this.tasks[taskIndex].redeemedAt) {
            this.tasks[taskIndex].redeemedAt = new Date();
        }
    } else if (newStatus !== 'redeemed') {
        this.tasks.push({
            taskId: taskIdToUpdate,
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date() : undefined,
            redeemedAt: undefined,
        });
    }
};

userSchema.methods.addPoints = function(amount) {
    if (amount > 0) {
        this.points += amount;
    }
};

userSchema.methods.redeemPoints = function(amount) {
    if (amount > 0 && this.points >= amount) {
        this.points -= amount;
        return true;
    }
    return false;
};

export default mongoose.models.User || mongoose.model('User', userSchema);