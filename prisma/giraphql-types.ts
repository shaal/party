import type { Prisma, User, Session, Profile, Invite, Tip, Post, Attachment, NFT, Poll, PollAnswer, Bookmark, PostTopic, Topic, Like, Product, Community, Rule, Badge, Notification, Integration, Log, Report } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Shape: User;
        Include: Prisma.UserInclude;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "posts" | "ownedProducts" | "subscribedProducts" | "ownedCommunities" | "moderatedCommunities" | "joinedCommunities" | "sessions" | "profile" | "tip" | "invite" | "integrations" | "likes" | "badges" | "topics" | "polls" | "bookmarks" | "logs" | "reports" | "following" | "followedBy" | "receivedNotification" | "dispatchedNotification";
        ListRelations: "posts" | "ownedProducts" | "subscribedProducts" | "ownedCommunities" | "moderatedCommunities" | "joinedCommunities" | "sessions" | "likes" | "badges" | "topics" | "polls" | "bookmarks" | "logs" | "reports" | "following" | "followedBy" | "receivedNotification" | "dispatchedNotification";
        Relations: {
            posts: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
            ownedProducts: {
                Shape: Product[];
                Types: PrismaTypes["Product"];
            };
            subscribedProducts: {
                Shape: Product[];
                Types: PrismaTypes["Product"];
            };
            ownedCommunities: {
                Shape: Community[];
                Types: PrismaTypes["Community"];
            };
            moderatedCommunities: {
                Shape: Community[];
                Types: PrismaTypes["Community"];
            };
            joinedCommunities: {
                Shape: Community[];
                Types: PrismaTypes["Community"];
            };
            sessions: {
                Shape: Session[];
                Types: PrismaTypes["Session"];
            };
            profile: {
                Shape: Profile | null;
                Types: PrismaTypes["Profile"];
            };
            tip: {
                Shape: Tip | null;
                Types: PrismaTypes["Tip"];
            };
            invite: {
                Shape: Invite | null;
                Types: PrismaTypes["Invite"];
            };
            integrations: {
                Shape: Integration | null;
                Types: PrismaTypes["Integration"];
            };
            likes: {
                Shape: Like[];
                Types: PrismaTypes["Like"];
            };
            badges: {
                Shape: Badge[];
                Types: PrismaTypes["Badge"];
            };
            topics: {
                Shape: Topic[];
                Types: PrismaTypes["Topic"];
            };
            polls: {
                Shape: PollAnswer[];
                Types: PrismaTypes["PollAnswer"];
            };
            bookmarks: {
                Shape: Bookmark[];
                Types: PrismaTypes["Bookmark"];
            };
            logs: {
                Shape: Log[];
                Types: PrismaTypes["Log"];
            };
            reports: {
                Shape: Report[];
                Types: PrismaTypes["Report"];
            };
            following: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
            followedBy: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
            receivedNotification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
            dispatchedNotification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
        };
    };
    Session: {
        Shape: Session;
        Include: Prisma.SessionInclude;
        Where: Prisma.SessionWhereUniqueInput;
        Fields: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Profile: {
        Shape: Profile;
        Include: Prisma.ProfileInclude;
        Where: Prisma.ProfileWhereUniqueInput;
        Fields: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Invite: {
        Shape: Invite;
        Include: Prisma.InviteInclude;
        Where: Prisma.InviteWhereUniqueInput;
        Fields: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Tip: {
        Shape: Tip;
        Include: Prisma.TipInclude;
        Where: Prisma.TipWhereUniqueInput;
        Fields: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Post: {
        Shape: Post;
        Include: Prisma.PostInclude;
        Where: Prisma.PostWhereUniqueInput;
        Fields: "user" | "product" | "community" | "likes" | "attachments" | "bookmarks" | "topics" | "poll" | "nft" | "parent" | "replies" | "notification" | "report";
        ListRelations: "likes" | "attachments" | "bookmarks" | "topics" | "replies" | "notification" | "report";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            product: {
                Shape: Product | null;
                Types: PrismaTypes["Product"];
            };
            community: {
                Shape: Community | null;
                Types: PrismaTypes["Community"];
            };
            likes: {
                Shape: Like[];
                Types: PrismaTypes["Like"];
            };
            attachments: {
                Shape: Attachment[];
                Types: PrismaTypes["Attachment"];
            };
            bookmarks: {
                Shape: Bookmark[];
                Types: PrismaTypes["Bookmark"];
            };
            topics: {
                Shape: PostTopic[];
                Types: PrismaTypes["PostTopic"];
            };
            poll: {
                Shape: Poll | null;
                Types: PrismaTypes["Poll"];
            };
            nft: {
                Shape: NFT | null;
                Types: PrismaTypes["NFT"];
            };
            parent: {
                Shape: Post | null;
                Types: PrismaTypes["Post"];
            };
            replies: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
            notification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
            report: {
                Shape: Report[];
                Types: PrismaTypes["Report"];
            };
        };
    };
    Attachment: {
        Shape: Attachment;
        Include: Prisma.AttachmentInclude;
        Where: Prisma.AttachmentWhereUniqueInput;
        Fields: "post";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
        };
    };
    NFT: {
        Shape: NFT;
        Include: Prisma.NFTInclude;
        Where: Prisma.NFTWhereUniqueInput;
        Fields: "post";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
        };
    };
    Poll: {
        Shape: Poll;
        Include: Prisma.PollInclude;
        Where: Prisma.PollWhereUniqueInput;
        Fields: "post" | "answers";
        ListRelations: "answers";
        Relations: {
            post: {
                Shape: Post | null;
                Types: PrismaTypes["Post"];
            };
            answers: {
                Shape: PollAnswer[];
                Types: PrismaTypes["PollAnswer"];
            };
        };
    };
    PollAnswer: {
        Shape: PollAnswer;
        Include: Prisma.PollAnswerInclude;
        Where: Prisma.PollAnswerWhereUniqueInput;
        Fields: "poll" | "voters";
        ListRelations: "voters";
        Relations: {
            poll: {
                Shape: Poll;
                Types: PrismaTypes["Poll"];
            };
            voters: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
        };
    };
    Bookmark: {
        Shape: Bookmark;
        Include: Prisma.BookmarkInclude;
        Where: Prisma.BookmarkWhereUniqueInput;
        Fields: "post" | "user";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    PostTopic: {
        Shape: PostTopic;
        Include: Prisma.PostTopicInclude;
        Where: Prisma.PostTopicWhereUniqueInput;
        Fields: "post" | "topic";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post | null;
                Types: PrismaTypes["Post"];
            };
            topic: {
                Shape: Topic | null;
                Types: PrismaTypes["Topic"];
            };
        };
    };
    Topic: {
        Shape: Topic;
        Include: Prisma.TopicInclude;
        Where: Prisma.TopicWhereUniqueInput;
        Fields: "posts" | "starrers";
        ListRelations: "posts" | "starrers";
        Relations: {
            posts: {
                Shape: PostTopic[];
                Types: PrismaTypes["PostTopic"];
            };
            starrers: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
        };
    };
    Like: {
        Shape: Like;
        Include: Prisma.LikeInclude;
        Where: Prisma.LikeWhereUniqueInput;
        Fields: "user" | "post" | "notification";
        ListRelations: "notification";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            post: {
                Shape: Post | null;
                Types: PrismaTypes["Post"];
            };
            notification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
        };
    };
    Product: {
        Shape: Product;
        Include: Prisma.ProductInclude;
        Where: Prisma.ProductWhereUniqueInput;
        Fields: "owner" | "subscribers" | "posts" | "notification";
        ListRelations: "subscribers" | "posts" | "notification";
        Relations: {
            owner: {
                Shape: User | null;
                Types: PrismaTypes["User"];
            };
            subscribers: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
            posts: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
            notification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
        };
    };
    Community: {
        Shape: Community;
        Include: Prisma.CommunityInclude;
        Where: Prisma.CommunityWhereUniqueInput;
        Fields: "owner" | "moderators" | "members" | "posts" | "rules";
        ListRelations: "moderators" | "members" | "posts" | "rules";
        Relations: {
            owner: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            moderators: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
            members: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
            posts: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
            rules: {
                Shape: Rule[];
                Types: PrismaTypes["Rule"];
            };
        };
    };
    Rule: {
        Shape: Rule;
        Include: Prisma.RuleInclude;
        Where: Prisma.RuleWhereUniqueInput;
        Fields: "community";
        ListRelations: never;
        Relations: {
            community: {
                Shape: Community | null;
                Types: PrismaTypes["Community"];
            };
        };
    };
    Badge: {
        Shape: Badge;
        Include: Prisma.BadgeInclude;
        Where: Prisma.BadgeWhereUniqueInput;
        Fields: "users";
        ListRelations: "users";
        Relations: {
            users: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
        };
    };
    Notification: {
        Shape: Notification;
        Include: Prisma.NotificationInclude;
        Where: Prisma.NotificationWhereUniqueInput;
        Fields: "receiver" | "dispatcher" | "like" | "product" | "post";
        ListRelations: never;
        Relations: {
            receiver: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            dispatcher: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            like: {
                Shape: Like | null;
                Types: PrismaTypes["Like"];
            };
            product: {
                Shape: Product | null;
                Types: PrismaTypes["Product"];
            };
            post: {
                Shape: Post | null;
                Types: PrismaTypes["Post"];
            };
        };
    };
    Integration: {
        Shape: Integration;
        Include: Prisma.IntegrationInclude;
        Where: Prisma.IntegrationWhereUniqueInput;
        Fields: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Log: {
        Shape: Log;
        Include: Prisma.LogInclude;
        Where: Prisma.LogWhereUniqueInput;
        Fields: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Report: {
        Shape: Report;
        Include: Prisma.ReportInclude;
        Where: Prisma.ReportWhereUniqueInput;
        Fields: "user" | "post";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            post: {
                Shape: Post | null;
                Types: PrismaTypes["Post"];
            };
        };
    };
}