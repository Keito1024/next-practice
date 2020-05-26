import { memberList } from '@/data';

// Resolver
// Resolver では何をレスポンスするかの処理を書きます。
export const getMembers = () => Promise.resolve(memberList)