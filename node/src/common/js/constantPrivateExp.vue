<script>
const SRVS = [
	// {text:'local',value:'127.0.0.1:8080'},
	{text:'local',value:'10.118.13.68:8080'},
	{text:'dev',value:'10.202.125.246:1080'},
	{text:'test',value:'xxx'},
	{text:'rec',value:'rec'},
	{text:'prd',value:'prd'}
];
const BIZ_TABLES=[
	{"text":'tabcn',"value":'tab'},
];
const THIRD_TABLES=[
	{"text":'tabcn',"value":'tab'},

];
const PSQLS = [
	{text:'process_log',value:'select DATA_PROCESS_ID,CRT_TM,SERVICE_KEY,PROCESS_END,SUCCESS,TOTAL_COUNT,NO_NEED_UPD_COUNT,UPD_COUNT,FAIL_PAGE_COUNT,TOTAL_COST,	TOTAL_PAGE,UNKNOWN_FAIL_COUNT,ADD_COUNT,FAIL_COUNT,UPD_TM,PROCESS_DETAIL from ts_process_log order by DATA_PROCESS_ID desc limit 10'},
	{text:'process_log_detail',value:'select * from ts_process_log_detail where PROCESS_LOG_ID =36 order by PROCESS_LOG_DETAIL_ID desc limit 10'},
	{text:'process_log_detail_count',value:'select count(*) from ts_process_log_detail where PROCESS_LOG_ID=369'},
	{text:'desc',value:'select table_name,table_comment,column_name,column_comment,DATA_TYPE,* from information_schema.columns where  table_name = ""' }
];

const HTML= [
'<!DOCTYPE html>',
'<html>',
'	<head>',
'		<meta charset="utf-8">',
'		<meta http-equiv="pragma" content="no-cache">',
'		<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">',
'		<meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT">',
'		<title></title>',
'	</head>',
'	<body>',
'<div id="app"></div><script type="text/javascript" src="http://aa/content/script/main/1514170840"/>',
'</body>',
'</html>'].join('\n');

export default{
	SRVS,BIZ_TABLES,THIRD_TABLES,PSQLS,HTML
}
</script>


