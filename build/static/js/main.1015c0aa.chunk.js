(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,a){},21:function(e,t){},22:function(e,t){},23:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(7),o=a.n(r),c=(a(16),a(1));var s=e=>{let{setData:t}=e;const[a,r]=Object(n.useState)(""),[o,s]=Object(n.useState)("");return l.a.createElement("div",null,l.a.createElement("input",{type:"file",onChange:e=>{const a=e.target.files[0];if(a&&"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===a.type){const e=new FileReader;e.onload=(e=>{try{const l=new Uint8Array(e.target.result),o=c.read(l,{type:"array"}),i=o.Sheets[o.SheetNames[0]],u=c.utils.sheet_to_json(i);t(u),r(""),s(a.name)}catch(n){r("Failed to read file. Please make sure it is a valid Excel file."),t([]),s("")}}),e.readAsArrayBuffer(a)}else r("Please upload a valid Excel file."),t([]),s("")},accept:".xlsx"}),a&&l.a.createElement("p",{style:{color:"red"}},a),o&&l.a.createElement("p",null,"Uploaded file: ",o))};var i=e=>{let{includeKeywords:t,handleIncludeKeywordsChange:a,excludeKeywords:n,handleExcludeKeywordsChange:r,minWords:o,setMinWords:c,maxWords:s,setMaxWords:i,intentFilter:u,handleIntentFilterChange:d,colorFilter:m,handleColorFilterChange:p}=e;return l.a.createElement("div",{style:{marginTop:"20px",marginLeft:"20px"}},l.a.createElement("textarea",{value:t,onChange:e=>a(e.target.value),placeholder:"Enter include keywords, one per line...",rows:"5",style:{width:"48%",marginRight:"2%"}}),l.a.createElement("textarea",{value:n,onChange:e=>r(e.target.value),placeholder:"Enter exclude keywords, one per line...",rows:"5",style:{width:"48%"}}),l.a.createElement("div",{style:{display:"flex",marginTop:"10px"}},l.a.createElement("input",{type:"number",value:o,onChange:e=>c(e.target.value),placeholder:"Min Words",style:{marginRight:"10px"}}),l.a.createElement("input",{type:"number",value:s,onChange:e=>i(e.target.value),placeholder:"Max Words"})),l.a.createElement("div",{style:{display:"flex",marginTop:"10px"}},l.a.createElement("input",{type:"text",value:u,onChange:e=>d(e.target.value),placeholder:"Intent Filter",style:{width:"48%",marginRight:"2%"}}),l.a.createElement("select",{value:m,onChange:e=>p(e.target.value),style:{width:"48%"}},l.a.createElement("option",{value:""},"Select Color Filter"),l.a.createElement("option",{value:"pink"},"Price (pink)"),l.a.createElement("option",{value:"blue"},"Information (blue)"),l.a.createElement("option",{value:"red"},"Review (red)"),l.a.createElement("option",{value:"yellow"},"Product (yellow)"),l.a.createElement("option",{value:"gray"},"Local (gray)"),l.a.createElement("option",{value:"orange"},"Services (orange)"),l.a.createElement("option",{value:"white"},"Topic (white)"))))};var u=e=>{let{data:t,getColorForIntent:a}=e;if(!t.length)return l.a.createElement("p",null,"No data available");const n=Object.keys(t[0]);return l.a.createElement("table",{border:"1",style:{width:"100%",marginTop:"20px"}},l.a.createElement("thead",null,l.a.createElement("tr",null,n.map(e=>l.a.createElement("th",{key:e},e)))),l.a.createElement("tbody",null,t.map((e,t)=>l.a.createElement("tr",{key:t,style:{backgroundColor:a(e.Intent)}},n.map(t=>l.a.createElement("td",{key:t},e[t]))))))};var d=()=>{const[e,t]=Object(n.useState)([]),[a,r]=Object(n.useState)(""),[o,d]=Object(n.useState)(""),[m,p]=Object(n.useState)(""),[g,h]=Object(n.useState)(""),[y,E]=Object(n.useState)(""),[v,w]=Object(n.useState)(""),x=a.split("\n").map(e=>e.trim()).filter(e=>e),f=o.split("\n").map(e=>e.trim()).filter(e=>e),C=e=>{switch(e){case"i":return"blue";case"re":return"red";case"pr":return"pink";case"sp":return"yellow";case"l":return"gray";case"dv":return"orange";default:return"white"}},b=e.filter(e=>{const t=0===x.length||x.some(t=>Object.values(e).some(e=>String(e).toLowerCase().includes(t.toLowerCase()))),a=f.some(t=>Object.values(e).some(e=>String(e).toLowerCase().includes(t.toLowerCase()))),n=""===y||e.Intent&&e.Intent.toLowerCase().includes(y.toLowerCase()),l=""===v||C(e.Intent)===v;if(!t||a||!n||!l)return!1;const r=Object.values(e).reduce((e,t)=>e+String(t).trim().split(/\s+/).length,0);return(""===m||r>=parseInt(m,10))&&(""===g||r<=parseInt(g,10))}),F=x.length>0?x.reduce((e,t)=>{const a=b.filter(e=>Object.values(e).some(e=>String(e).toLowerCase().includes(t.toLowerCase())));return a.length>0&&(e[t]=a),e},{}):{"Filtered Data":b};return l.a.createElement("div",{style:{marginTop:"20px",marginLeft:"20px"}},l.a.createElement("h1",null,"Excel Filter App"),l.a.createElement(s,{setData:t}),e.length>0&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{style:{display:"flex"}},l.a.createElement("div",{style:{flex:"1",marginRight:"20px"}},l.a.createElement("h2",null,"All Data"),l.a.createElement(u,{data:e,getColorForIntent:C})),l.a.createElement("div",{style:{flex:"3"}},l.a.createElement(i,{includeKeywords:a,handleIncludeKeywordsChange:e=>{r(e)},excludeKeywords:o,handleExcludeKeywordsChange:e=>{d(e)},minWords:m,setMinWords:p,maxWords:g,setMaxWords:h,intentFilter:y,handleIntentFilterChange:e=>{E(e)},colorFilter:v,handleColorFilterChange:e=>{w(e)}}),l.a.createElement("div",{style:{display:"flex",flexWrap:"wrap",marginTop:"20px"}},Object.keys(F).map((e,t)=>l.a.createElement("div",{key:e,style:{flex:"1 1 20%",margin:"10px"}},l.a.createElement("h2",null,e),l.a.createElement(u,{data:F[e],getColorForIntent:C})))))),l.a.createElement("button",{onClick:()=>{const t=c.utils.json_to_sheet(e),a=c.utils.book_new();c.utils.book_append_sheet(a,t,"AllData"),Object.keys(F).forEach(e=>{const t=c.utils.json_to_sheet(F[e]);c.utils.book_append_sheet(a,t,e)});const n=new Date,l="".concat(n.getFullYear(),"-").concat(n.getMonth()+1,"-").concat(n.getDate(),"_").concat(n.getHours(),"-").concat(n.getMinutes(),"-").concat(n.getSeconds()),r="filtered_data_".concat(l,".xlsx");c.writeFile(a,r)},style:{marginTop:"20px"}},"Download All Data")))};var m=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,24)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:r,getTTFB:o}=t;a(e),n(e),l(e),r(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(d,null))),m()},6:function(e,t){},8:function(e,t,a){e.exports=a(23)}},[[8,1,2]]]);
//# sourceMappingURL=main.1015c0aa.chunk.js.map