export interface User {
    uuid: string,
    name: string,
    carma: number,
    createdAt: Date,
    role: string,
    timeAgo: string
}

export interface Forum {
    uuid: string,
    authorUuid: string,
    authorName: string,
    name: string,
    description: string,
    subscribers: number,
    subscribed: boolean,
    timeAgo: string
}

export interface Post {
    uuid: string,
    forumUuid: string,
    forumName: string,
    authorUuid: string,
    authorName: string,
    title: string,
    content: string,
    score: number,
    commentCount: number,
    myVote?: string,
    timeAgo: string
}

export interface Comment {
    uuid: string,
    postUuid: string,
    authorUuid: string,
    authorName: string,
    content: string,
    score: number,
    createdAt: Date,
    myVote?: string,
    children?: Comment[],
    timeAgo: string
}

export interface AuthUser {
    name: string,
    uuid: string
}