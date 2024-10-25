/******************************************************************
 * 参考資料： https://data-x.jp/blog/gassetmintrigger/#index_id4
 *
 * Google フォームで回答を受付時間と受付終了時間をコントロール
 * トリガーにより時間指定でイベントを発火させている
 * 使用後のトリガーは溜まらないように削除処理を施している
 * 受付状態の切り替えをすることで出席情報を毎日別レコードとして扱えるようにしている
 ******************************************************************/
// パラメータ
const TARGET_FORM = FormApp.getActiveForm();
const OPEN_TRIGGER = 'formOpenFunc';
const CLOSE_TRIGGER = 'formCloseFunc';

/*=================================================================
・トリガーを定期的に設定および削除するプロセス
=================================================================*/
// 【トリガー設定： formCloseFunc】
// 既存の同名のトリガーを削除した後、
// 当日20：49にトリガーをセットする処理
function closeTrigger() {
  let triggers = ScriptApp.getScriptTriggers();
  for(let trigger of triggers){
    let funcName = trigger.getHandlerFunction();
    //function名を定期実行したい関数名に変更する
    if(funcName == CLOSE_TRIGGER){
      ScriptApp.deleteTrigger(trigger);
    }
  }
  // 時間指定をするために現在のYYYY-MM-ddを取得
  let now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth();
  let d = now.getDate();
  // トリガーの時間指定
  let date = new Date(y, m, d, 20, 49); // 処理時間を加味して20：49とする
  //function名を定期実行したい関数名に変更する
  ScriptApp.newTrigger(CLOSE_TRIGGER).timeBased().at(date).create();
}

// 【トリガー設定： formOpenFunc】
// 既存の同名のトリガーを削除した後、
// 翌日00:00にトリガーをセットする処理
function openTrigger() {
  let triggers = ScriptApp.getScriptTriggers();
  for(let trigger of triggers){
    let funcName = trigger.getHandlerFunction();
    //function名を定期実行したい関数名に変更する
    if(funcName == OPEN_TRIGGER){
      ScriptApp.deleteTrigger(trigger);
    }
  }
  // 時間指定をするために現在のYYYY-MM-ddを取得
  let now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth();
  let d = now.getDate();
  // トリガーの時間指定
  let date = new Date(y, m, d+1, 00, 00);
  //function名を定期実行したい関数名に変更する
  ScriptApp.newTrigger(OPEN_TRIGGER).timeBased().at(date).create();
}


/*=================================================================
・フォームを無効(回答を受け付けない)にする
=================================================================*/
function formCloseFunc() {
  TARGET_FORM.setAcceptingResponses(false);
  openTrigger(); // 上記内容が処理し終える度にトリガーをセットする
}

/*=================================================================
・フォームを有効(回答を受け付ける)にする
=================================================================*/
function formOpenFunc() {
  TARGET_FORM.setAcceptingResponses(true);
  closeTrigger(); // 上記内容が処理し終える度にトリガーをセットする
}

