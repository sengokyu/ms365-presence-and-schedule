/**
 * ステータスメッセージ
 */
export interface StatusMessageEntity {
  publishedDateTime?: Date;
  message: string;
  // 他人に表示
  pinned: boolean;
  // 有効期限
  expiryDate?: Date | null;
}
