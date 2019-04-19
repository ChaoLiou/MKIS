export default function(key, locale = "zh-tw") {
  return key && map[key] ? map[key][locale] : key;
}

const map = {
  filter: {
    "zh-tw": "篩選",
    "zh-cn": "筛选",
    en: "Filters",
    ja: "スクリーニング"
  },
  selectall: {
    "zh-tw": "選擇所有",
    "zh-cn": "选择所有",
    en: "Select All",
    ja: "すべて選択"
  },
  clearall: {
    "zh-tw": "清除選擇",
    "zh-cn": "清除选择",
    en: "Select None",
    ja: "選択をクリアする"
  },
  countrychoises: {
    "zh-tw": "國家選擇",
    "zh-cn": "国家选择",
    en: "Country Showing",
    ja: "国の選択"
  },
  preweek: {
    "zh-tw": "上週",
    "zh-cn": "上周",
    en: "Pre Week",
    ja: "先週"
  },
  nextweek: {
    "zh-tw": "下週",
    "zh-cn": "下周",
    en: "Next Week",
    ja: "來週"
  },
  from: {
    "zh-tw": "從",
    "zh-cn": "从",
    en: "From",
    ja: "から"
  },
  to: {
    "zh-tw": "至",
    "zh-cn": "至",
    en: "To",
    ja: "まで"
  },
  weeklyview: {
    "zh-tw": "顯示一週全部",
    "zh-cn": "显示一周全部",
    en: "Weekly View",
    ja: "1週間表示する"
  },
  ecostatistics: {
    "zh-tw": "財經日曆",
    "zh-cn": "财经日历",
    en: "Economic Calendar",
    ja: "財務カレンダー"
  },
  time: {
    "zh-tw": "時間",
    "zh-cn": "时间",
    en: "Time",
    ja: "時刻"
  },
  country: {
    "zh-tw": "國家",
    "zh-cn": "国家",
    en: "Country",
    ja: "国家"
  },
  area: {
    "zh-tw": "地區",
    "zh-cn": "地区",
    en: "Area",
    ja: "地区"
  },
  event: {
    "zh-tw": "主要經濟指標",
    "zh-cn": "主要经济指标",
    en: "Economic Indicators",
    ja: "主要経済指標"
  },
  importance: {
    "zh-tw": "重要性",
    "zh-cn": "重要性",
    en: "Importance",
    ja: "重要度"
  },
  actual: {
    "zh-tw": "實際值",
    "zh-cn": "实际值",
    en: "Actual",
    ja: "結果"
  },
  forecast: {
    "zh-tw": "預估值",
    "zh-cn": "预估值",
    en: "Forecast",
    ja: "予想"
  },
  previous: {
    "zh-tw": "前值",
    "zh-cn": "前值",
    en: "Previous",
    ja: "前回"
  },
  modified: {
    "zh-tw": "修正值",
    "zh-cn": "修正值",
    en: "Modified",
    ja: "改定値"
  },
  低: {
    "zh-tw": "低",
    "zh-cn": "低",
    en: "Low",
    ja: "低"
  },
  中: {
    "zh-tw": "中",
    "zh-cn": "中",
    en: "Medium",
    ja: "中"
  },
  高: {
    "zh-tw": "高",
    "zh-cn": "高",
    en: "High",
    ja: "高"
  },
  US: {
    "zh-tw": "美國",
    "zh-cn": "美国",
    en: "US",
    ja: "米国"
  },
  UK: {
    "zh-tw": "英國",
    "zh-cn": "英国",
    en: "UK",
    ja: "英国"
  },
  CA: {
    "zh-tw": "加拿大",
    "zh-cn": "加拿大",
    en: "CA",
    ja: "カナダ"
  },
  JP: {
    "zh-tw": "日本",
    "zh-cn": "日本",
    en: "JP",
    ja: "日本"
  },
  AU: {
    "zh-tw": "澳洲",
    "zh-cn": "澳洲",
    en: "AU",
    ja: "豪州"
  },
  CN: {
    "zh-tw": "中國",
    "zh-cn": "中国",
    en: "CN",
    ja: "中国"
  },
  EU: {
    "zh-tw": "歐元區",
    "zh-cn": "欧元區",
    en: "EU",
    ja: "ユーロ圏"
  },
  CH: {
    "zh-tw": "瑞士",
    "zh-cn": "瑞士",
    en: "CH",
    ja: "スイス"
  },
  FR: {
    "zh-tw": "法國",
    "zh-cn": "法国",
    en: "FR",
    ja: "仏国"
  },
  DE: {
    "zh-tw": "德國",
    "zh-cn": "德国",
    en: "DE",
    ja: "ドイツ"
  },
  create: {
    "zh-tw": "新增",
    "zh-cn": "创建",
    en: "Create",
    ja: "追加"
  },
  delete: {
    "zh-tw": "刪除",
    "zh-cn": "删除",
    en: "Delete",
    ja: "削除"
  },
  restore: {
    "zh-tw": "還原",
    "zh-cn": "还原",
    en: "Restore",
    ja: "復元"
  },
  update: {
    "zh-tw": "更新",
    "zh-cn": "更新",
    en: "Update",
    ja: "更新"
  },
  multiselect_info: {
    "zh-tw": "按住shift, 即可多選",
    "zh-cn": "按住shift, 即可多选",
    en: "hold shift key to multi select",
    ja: "シフトを押したまま、複数選択することができます"
  },
  state: {
    "zh-tw": "狀態",
    "zh-cn": "状态",
    en: "State",
    ja: "狀態"
  },
  createdbydate: {
    "zh-tw": "新增日期",
    "zh-cn": "新增日期",
    en: "Create date",
    ja: "日付を追加"
  },
  validdate: {
    "zh-tw": "有效日",
    "zh-cn": "有效日",
    en: "Valid date",
    ja: "有効日"
  },
  import: {
    "zh-tw": "匯入",
    "zh-cn": "汇入",
    en: "Import",
    ja: "インポート"
  },
  multiimport: {
    "zh-tw": "多檔匯入",
    "zh-cn": "多档汇入",
    en: "Import Files",
    ja: "複数のファイルのインポート"
  },
  login: {
    "zh-tw": "登入",
    "zh-cn": "登入",
    en: "Sign In",
    ja: "ログイン"
  },
  logout: {
    "zh-tw": "登出",
    "zh-cn": "登出",
    en: "Sign Out",
    ja: "ログアウト"
  },
  closemodal: {
    "zh-tw": "關閉",
    "zh-cn": "关闭",
    en: "Close",
    ja: "閉じる"
  },
  zhTWLocale: {
    "zh-tw": "繁體中文",
    "zh-cn": "繁體中文",
    en: "繁體中文",
    ja: "繁體中文"
  },
  zhCNLocale: {
    "zh-tw": "简体中文",
    "zh-cn": "简体中文",
    en: "简体中文",
    ja: "简体中文"
  },
  enUSLocale: {
    "zh-tw": "English",
    "zh-cn": "English",
    en: "English",
    ja: "English"
  },
  jaLocale: {
    "zh-tw": "日本語",
    "zh-cn": "日本語",
    en: "日本語",
    ja: "日本語"
  },
  nodatamessage: {
    "zh-tw": "今日無重要經濟數據",
    "zh-cn": "今日无重要经济数据",
    en: "No important economic data today",
    ja: "重要な経済データは今日ありません"
  },
  weeknodatamessage: {
    "zh-tw": "無記錄",
    "zh-cn": "无记录",
    en: "No record",
    ja: "記録なし"
  },
  backendlogintitle: {
    "zh-tw": "MKIS後台系統",
    "zh-cn": "MKIS后台系统",
    en: "MKIS Back-End System",
    ja: "MKIS Back-End System"
  },
  Hawaii: {
    "zh-tw": "夏威夷",
    "zh-cn": "夏威夷",
    en: "Hawaii",
    ja: "ハワイ"
  },
  Aleutian: {
    "zh-tw": "阿留申群島",
    "zh-cn": "阿留申群岛",
    en: "Aleutian",
    ja: "アリューシャン列島"
  },
  Alaska: {
    "zh-tw": "阿拉斯加",
    "zh-cn": "阿拉斯加",
    en: "Alaska",
    ja: "アラスカ"
  },
  Los_Angeles: {
    "zh-tw": "溫哥華，洛杉磯",
    "zh-cn": "温哥华，洛杉矶",
    en: "Vancouver, Los Angeles",
    ja: "バンクーバー, ロサンゼルス"
  },
  Denver: {
    "zh-tw": "丹佛",
    "zh-cn": "丹佛",
    en: "Denver",
    ja: "デンバー"
  },
  Chicago: {
    "zh-tw": "墨西哥，芝加哥",
    "zh-cn": "墨西哥，芝加哥",
    en: "Mexico City, Chicago",
    ja: "メキシコ, シカゴ"
  },
  New_York: {
    "zh-tw": "紐約，聖地牙哥，多倫多",
    "zh-cn": "纽约，圣地亚哥，多伦多",
    en: "New York, Santiago, Toronto",
    ja: "ニューヨーク, サンディエゴ, トロント"
  },
  Buenos_Aires: {
    "zh-tw": "布宜諾斯艾利斯",
    "zh-cn": "布宜诺斯艾利斯",
    en: "Buenos Aires",
    ja: "ブエノスアイレス"
  },
  DeNoronha: {
    "zh-tw": "費爾南多·迪諾羅尼亞群島",
    "zh-cn": "费尔南多·迪诺罗尼亚群岛",
    en: "DeNoronha",
    ja: "DeNoronha"
  },
  Cape_Verde: {
    "zh-tw": "維德角",
    "zh-cn": "维德角",
    en: "Cape Verde",
    ja: "カーボベルデ"
  },
  UTC: {
    "zh-tw": "UTC",
    "zh-cn": "UTC",
    en: "UTC",
    ja: "UTC"
  },
  London: {
    "zh-tw": "倫敦，里斯本",
    "zh-cn": "伦敦，里斯本",
    en: "London, Lisbon",
    ja: "ロンドン, リスボン"
  },
  Paris: {
    "zh-tw": "巴黎，柏林",
    "zh-cn": "巴黎，柏林",
    en: "Paris, Berlin",
    ja: "パリ, ベルリン"
  },
  Moscow: {
    "zh-tw": "莫斯科，伊斯坦布爾，奈洛比，雅典",
    "zh-cn": "莫斯科，伊斯坦布尔，奈洛比，雅典",
    en: "Moscow, Istanbul, Nairobi, Athens",
    ja: "モスクワ, イスタンブール, ナイロビ, アテネ"
  },
  Dubai: {
    "zh-tw": "杜拜",
    "zh-cn": "迪拜",
    en: "Dubai",
    ja: "ドバイ"
  },
  Karachi: {
    "zh-tw": "喀拉蚩",
    "zh-cn": "喀拉蚩",
    en: "Karachi",
    ja: "カラチ"
  },
  Dhaka: {
    "zh-tw": "達卡，阿拉木圖",
    "zh-cn": "达卡，阿拉木图",
    en: "Dhaka, Almaty",
    ja: "ダッカ, アルマトイ"
  },
  Bangkok: {
    "zh-tw": "雅加達，曼谷",
    "zh-cn": "雅加达，曼谷",
    en: "Jakarta, Bangkok",
    ja: "ジャカルタ, バンコク"
  },
  Shanghai: {
    "zh-tw": "新加坡，上海，香港",
    "zh-cn": "新加坡，上海，香港",
    en: "Singapore, Shanghai, Hong Kong",
    ja: "シンガポール, シャンハイ, ホンコン"
  },
  Tokyo: {
    "zh-tw": "東京，首爾",
    "zh-cn": "东京，首尔",
    en: "Tokyo, Seoul",
    ja: "東京, ソウル"
  },
  Sydney: {
    "zh-tw": "海參崴，墨爾本，雪梨，布里斯本",
    "zh-cn": "海参崴，墨尔本，雪梨，布里斯本",
    en: "Vladivostok, Melbourne, Sydney, Brisbane",
    ja: "ウラジオストク, メルボルン, シドニー, ブリスベン"
  },
  Noumea: {
    "zh-tw": "努美阿",
    "zh-cn": "努美阿",
    en: "Noumea",
    ja: "ヌーメア"
  },
  Fiji: {
    "zh-tw": "奧克蘭，斐濟",
    "zh-cn": "奥克兰，斐济",
    en: "Auckland, Fiji",
    ja: "オークランド, フィジー"
  },
  Samoa: {
    "zh-tw": "薩摩亞",
    "zh-cn": "萨摩亚",
    en: "Samoa",
    ja: "サモア"
  }
};
