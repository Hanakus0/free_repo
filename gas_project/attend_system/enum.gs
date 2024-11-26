// 定数を列挙
// common parameter
const SPREAD_SHEET_URI = '163nq_w6AMQ57-LOT-w00Q5iWmFk1-rZeYi0RbnXgwGY'; // スプレッドシート識別子
const TARGET_FORM = FormApp.getActiveForm(); // 対象のフォーム

// main.gs
const OPEN_TRIGGER = 'formOpenFunc'; // トリガー名
const CLOSE_TRIGGER = 'formCloseFunc'; // トリガー名
const SEND_MAIL_TRIGGER = 'process_send_email'; // トリガー名

// setting_radio_btn.gs
const TARGET_COLUMN_NAME = '参加者名'; // 対象カラム

// send_reminder.gs
const TARGET_COLUMN_EMAIL = 'メールアドレス'; // 対象カラム
const FROM_EMAIL_ADDRESS = "no.necessary.reply.to.this.mail@gmail.com";
