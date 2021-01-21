(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n(2),i=n.n(a),o=n(7),l=n.n(o),c=(n(14),n(6)),u=(n(15),n(0)),s=n.p+"static/media/Pokemon.8dbaf65e.csv",d=["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"],f={Normal:"#A8A77A",Fire:"#EE8130",Water:"#6390F0",Electric:"#F7D02C",Grass:"#7AC74C",Ice:"#96D9D6",Fighting:"#C22E28",Poison:"#A33EA1",Ground:"#E2BF65",Flying:"#A98FF3",Psychic:"#F95587",Bug:"#A6B91A",Rock:"#B6A136",Ghost:"#735797",Dragon:"#6F35FC",Dark:"#705746",Steel:"#B7B7CE",Fairy:"#D685AD"},p=["#6390F0","#A8A77A","#7AC74C","#F7D02C","#A6B91A","#735797"],y=["Generation 1","Generation 2","Generation 3","Generation 4","Generation 5","Generation 6"],h=["#A8A77A","#EE8130","#6390F0","#F7D02C","#7AC74C","#96D9D6","#C22E28","#A33EA1","#E2BF65","#A98FF3","#F95587","#A6B91A","#B6A136","#735797","#6F35FC","#705746","#B7B7CE","#D685AD"],g=[],m=n(8),v=function(t,e,n,r){var a=function(t){u.p("#chordDiagram").selectAll("svg").remove();var e=function(t){var e=[];Object(m.a)(Array(18).keys()).forEach((function(n){e.push(t.filter((function(t){return t.type_1===n})))}));var n=Array(18).fill().map((function(){return Array(18).fill(0)}));return e.forEach((function(t,e){t.forEach((function(t){t.type_2&&(n[e][t.type_2]+=1)}))})),n}(t),a=90,i=90,o=90,l=90,c=700-a-o,s=350-i-l,f=157.5,p=!1,y=u.a().innerRadius(159.075).outerRadius(173.25),g=u.p("#chordDiagram").append("svg").attr("width",c+a+o).attr("height",s+i+l).append("g").attr("transform","translate("+(c/2+a)+","+(s/2+i)+")"),v=u.d().sortSubgroups(u.f)(e);function b(){return function(t,e){g.selectAll("path.chord").filter((function(t){return t.source.index!==e&&t.target.index!==e})).transition(50).style("opacity",p?1:.1),p=!p}}g.datum(v).append("g").selectAll("g").data((function(t){return t.groups})).enter().append("g").append("path").style("fill",(function(t,e){return h[e]})).style("stroke","black").attr("d",y),g.datum(v).append("g").selectAll("path").data((function(t){return t})).enter().append("path").attr("class","chord").attr("d",u.l().radius(f)).style("fill",(function(t){return h[t.source.index]})).style("stroke","black"),g.selectAll("g.group").data((function(t){return t.groups})).enter().append("g").attr("class","group").on("mouseover",b()).on("mouseout",b()).on("click",(function(t,e){n(r===e?void 0:e)})).append("path").style("fill",(function(t){return h[t.index]})).attr("id",(function(t,e){return"group"+t.index})).attr("d",y),g.selectAll("mydots").data(d.filter((function(t,e){return e>=9}))).enter().append("circle").attr("id",(function(t,e){return e})).attr("cx",220).attr("cy",(function(t,e){return 25*e-110})).attr("r",7).style("fill",(function(t,e){return h[e+9]})).on("mouseover",b()).on("mouseout",b()).on("click",(function(t,e){n(r===e?void 0:e)})),g.selectAll("mylabels").data(d.filter((function(t,e){return e>=9}))).enter().append("text").attr("class","chordLabelText").attr("x",240).attr("y",(function(t,e){return 25*e-110})).style("fill",(function(t,e){return h[e+9]})).text((function(t,e){return t})).attr("text-anchor","left").style("alignment-baseline","middle").on("mouseover",b()).on("mouseout",b()).on("click",(function(t,e){n(r===e?void 0:e)})),g.selectAll("mydots").data(d.filter((function(t,e){return e<9}))).enter().append("circle").attr("id",(function(t,e){return e})).attr("cx",-300).attr("cy",(function(t,e){return 25*e-110})).attr("r",7).style("fill",(function(t,e){return h[e]})).on("mouseover",b()).on("mouseout",b()).on("click",(function(t,e){n(r===e?void 0:e)})),g.selectAll("mylabels").data(d.filter((function(t,e){return e<9}))).enter().append("text").attr("class","chordLabelText").attr("x",-280).attr("y",(function(t,e){return 25*e-110})).style("fill",(function(t,e){return h[e]})).text((function(t,e){return t})).attr("text-anchor","left").style("alignment-baseline","middle").on("mouseover",b()).on("mouseout",b()).on("click",(function(t,e){n(r===e?void 0:e)}))};a(void 0!==e?t.filter((function(t){return t.generation===e})):t)},b=!1,x=[],A=n.p+"static/media/pokemon.03d2cb1c.png",j=n.p+"static/media/charizard.9816fea6.png",k=function(){var t=Object(a.useState)(),e=Object(c.a)(t,2),n=e[0],i=e[1],o=Object(a.useState)(),l=Object(c.a)(o,2),m=l[0],k=l[1];return Object(a.useEffect)((function(){u.e(s,(function(t){t.forEach((function(t){Object.keys(t).forEach((function(e){"name"!==e&&("type_2"===e?""!==t[e]&&(t[e]=+t[e]):t[e]=+t[e])}))})),function(t,e,n,r){var a=function(t){u.p("#pieChart").selectAll("svg").remove();var r=t.filter((function(t){return 0===t.generation})),a=t.filter((function(t){return 1===t.generation})),i=t.filter((function(t){return 2===t.generation})),o=t.filter((function(t){return 3===t.generation})),l=t.filter((function(t){return 4===t.generation})),c=t.filter((function(t){return 5===t.generation})),s={"Gen 1":r.length,"Gen 2":a.length,"Gen 3":i.length,"Gen 4":o.length,"Gen 5":l.length,"Gen 6":c.length};Object.keys(s).forEach((function(t){0===s[t]&&delete s[t]}));var d=u.p("#pieChart").append("svg").attr("width",400).attr("height",300).append("g").attr("transform","translate(200,150)"),f=u.o().domain(s).range(p),y=u.k().value((function(t){return t.value})).sort(null)(u.g(s)),h=u.a().innerRadius(64).outerRadius(128),g=u.a().innerRadius(144).outerRadius(144);d.selectAll("allPolylines").data(y).enter().append("polyline").attr("stroke",(function(t,e){return p[e]})).style("opacity",1).style("fill","none").attr("stroke-width",1).attr("points",(function(t){var e=h.centroid(t),n=g.centroid(t),r=g.centroid(t),a=t.startAngle+(t.endAngle-t.startAngle)/2;return r[0]=152*(a<Math.PI?1:-1),[e,n,r]})),d.selectAll("mySlices").data(y).enter().append("path").attr("class","donutArc").attr("d",h).attr("fill",(function(t){return f(t.data.key)})).on("click",(function(t){var r=+t.data.key.replace(/^\D+/g,"")-1;e(n===r?void 0:r)})).transition().delay((function(t,e){return e})).duration(800).attrTween("d",(function(t){var e=u.i(t.startAngle+.1,t.endAngle);return function(n){return t.endAngle=e(n),h(t)}})).style("opacity",1),d.selectAll("mySlices").data(y).enter().append("text").text((function(t){return t.data.value})).attr("transform",(function(t){return"translate("+h.centroid(t)+")"})).on("click",(function(t){var r=+t.data.key.replace(/^\D+/g,"")-1;e(n===r?void 0:r)})).style("text-anchor","middle").style("font-size",17).style("font-weight","bold").attr("fill","white"),d.selectAll("allLabels").data(y).enter().append("text").text((function(t){return t.data.key})).attr("transform",(function(t){var e=g.centroid(t),n=t.startAngle+(t.endAngle-t.startAngle)/2;return e[0]=158.4*(n<Math.PI?1:-1),"translate("+e+")"})).style("text-anchor",(function(t){return t.startAngle+(t.endAngle-t.startAngle)/2<Math.PI?"start":"end"})).attr("font-weight","bold").attr("fill","white")};if(void 0!==r){var i=t.filter((function(t){return t.type_1===r}));i.length!==t.length&&a(i)}else t.length===g.length&&void 0!==r||a(t),g=t}(t,i,n,m),function(t,e,n,r){var a=30,i=30,o=70,l=60,c=800-l-i,s=350-a-o,p=u.p("#barChart").append("div").attr("class","tooltip").style("opacity",0),y=function(t){u.p("#barChart").selectAll("svg").remove();var e=[],y=[],h=[],g=[],m=[],v=[],b=[],x=[],A=[],j=[],k=[],_=[],O=[],F=[],C=[],w=[],D=[],E=[];void 0!==n?(e=t.filter((function(t){return 0===t.type_2})),y=t.filter((function(t){return 1===t.type_2})),h=t.filter((function(t){return 2===t.type_2})),g=t.filter((function(t){return 3===t.type_2})),m=t.filter((function(t){return 4===t.type_2})),v=t.filter((function(t){return 5===t.type_2})),b=t.filter((function(t){return 6===t.type_2})),x=t.filter((function(t){return 7===t.type_2})),A=t.filter((function(t){return 8===t.type_2})),j=t.filter((function(t){return 9===t.type_2})),k=t.filter((function(t){return 10===t.type_2})),_=t.filter((function(t){return 11===t.type_2})),O=t.filter((function(t){return 12===t.type_2})),F=t.filter((function(t){return 13===t.type_2})),C=t.filter((function(t){return 14===t.type_2})),w=t.filter((function(t){return 15===t.type_2})),D=t.filter((function(t){return 16===t.type_2})),E=t.filter((function(t){return 17===t.type_2}))):(e=t.filter((function(t){return 0===t.type_1})),y=t.filter((function(t){return 1===t.type_1})),h=t.filter((function(t){return 2===t.type_1})),g=t.filter((function(t){return 3===t.type_1})),m=t.filter((function(t){return 4===t.type_1})),v=t.filter((function(t){return 5===t.type_1})),b=t.filter((function(t){return 6===t.type_1})),x=t.filter((function(t){return 7===t.type_1})),A=t.filter((function(t){return 8===t.type_1})),j=t.filter((function(t){return 9===t.type_1})),k=t.filter((function(t){return 10===t.type_1})),_=t.filter((function(t){return 11===t.type_1})),O=t.filter((function(t){return 12===t.type_1})),F=t.filter((function(t){return 13===t.type_1})),C=t.filter((function(t){return 14===t.type_1})),w=t.filter((function(t){return 15===t.type_1})),D=t.filter((function(t){return 16===t.type_1})),E=t.filter((function(t){return 17===t.type_1})));var G=[{type:"Normal",amount:e.length},{type:"Fire",amount:y.length},{type:"Water",amount:h.length},{type:"Electric",amount:g.length},{type:"Grass",amount:m.length},{type:"Ice",amount:v.length},{type:"Fighting",amount:b.length},{type:"Poison",amount:x.length},{type:"Ground",amount:A.length},{type:"Flying",amount:j.length},{type:"Psychic",amount:k.length},{type:"Bug",amount:_.length},{type:"Rock",amount:O.length},{type:"Ghost",amount:F.length},{type:"Dragon",amount:C.length},{type:"Dark",amount:w.length},{type:"Steel",amount:D.length},{type:"Fairy",amount:E.length}],P=u.p("#barChart").append("svg").attr("width",c+l+i).attr("height",s+a+o).append("g").attr("transform","translate("+l+","+a+")").on("mouseout",(function(){return p.transition().duration(50).style("opacity",0)}));G.sort((function(t,e){return e.amount-t.amount}));var N=u.m().range([0,c]).domain(G.map((function(t){return t.type}))).padding(.2);P.append("g").attr("transform","translate(0,"+s+")").attr("class","axisWhite").call(u.b(N)).selectAll("text").attr("fill","white").attr("font-size","12px").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end");var S=u.n().domain([0,G[0].amount]).range([s,0]);P.append("g").attr("class","axisWhite barplotAxis").call(u.c(S)).selectAll("text").attr("font-size","12px").attr("fill","white"),P.selectAll("mybar").data(G).enter().append("rect").attr("x",(function(t){return N(t.type)})).attr("y",(function(t){return S(0)})).attr("width",N.bandwidth()).attr("height",(function(t){return s-S(0)})).attr("fill",(function(t){return f[t.type]})).on("mouseover",(function(t){p.transition().duration(200).style("opacity",1),p.html("".concat(t.amount," Pokemon")).style("left",(function(){return u.h.pageX-40+"px"})).style("top",u.h.pageY-40+"px")})).on("mouseleave",(function(){return p.transition().duration(200).style("opacity",0)})).on("click",(function(t,e){console.log(e),d.forEach((function(e,n){return e===t.type&&r(n)})),p.transition().duration(200).style("opacity",0)})),P.selectAll("rect").transition().duration(800).attr("y",(function(t){return S(t.amount)})).attr("height",(function(t){return s-S(t.amount)})).delay((function(t,e){return 100*e}))};if(void 0!==n||void 0!==e){var h=t;void 0!==n&&(h=h.filter((function(t){return t.type_1===n}))),void 0!==e&&(h=h.filter((function(t){return t.generation===e}))),y(h)}else y(t)}(t,n,m,k),v(t,n,k,m),function(t,e){var n=function(t){u.p("#bubblePlot").selectAll("svg").remove();var e=t.filter((function(t){return 1===t.legendary})),n=10,r=20,a=30,i=50,o=500-i-r,l=350-n-a,c=u.p("#bubblePlot").append("svg").attr("width",o+i+r).attr("height",l+n+a).append("g").attr("transform","translate("+i+","+n+")"),s=u.n().domain([30,220]).range([0,o]),f=c.append("g").attr("transform","translate(0,"+l+")").call(u.b(s).tickSize(0)).attr("class","axisWhite").selectAll("text").attr("font-size","15px").attr("fill","white"),p=u.n().domain([0,220]).range([l,0]),y=c.append("g").call(u.c(p).tickSize(0)).attr("class","axisWhite").selectAll("text").attr("font-size","15px").attr("fill","white");c.append("defs").append("SVG:clipPath").attr("id","clip").append("SVG:rect").attr("width",o).attr("height",l).attr("x",0).attr("y",0);var g=u.q().scaleExtent([.5,20]).translateExtent([[0,0],[o+i+r,1/0]]).extent([[0,0],[o+i+r,l+n+a]]).on("zoom",(function(){var t=u.h.transform.rescaleX(s),e=u.h.transform.rescaleY(p);f.remove(),y.remove(),f=c.append("g").attr("transform","translate(0,"+l+")").call(u.b(t).tickSize(0)).attr("class","axisWhite").attr("font-size","15px").selectAll("text").attr("fill","white"),y=c.append("g").call(u.c(e).tickSize(0)).attr("class","axisWhite").selectAll("text").attr("font-size","15px").attr("fill","white"),m.selectAll("circle").attr("cx",(function(e){return t(e.attack)})).attr("cy",(function(t){return e(t.defense)}))})),m=c.append("g").attr("clip-path","url(#clip)").call(g),v=u.n().domain([0,150]).range([4,20]);m.selectAll("dot").data(e).enter().append("circle").attr("cx",(function(t){return s(t.attack)})).attr("cy",(function(t){return p(t.defense)})).attr("r",(function(t,e){return v(0)})).style("fill",(function(t){return h[t.type_1]})).style("opacity","0.7").attr("stroke","white").style("stroke-width","2px").on("click",(function(t){b?x.transition().duration(50).style("opacity",0).style("pointer-events","none"):(x.transition().duration(200),x.style("opacity",1).style("pointer-events","none").html("".concat(t.name,"<br/>Health: ").concat(t.hp," <br/>Attack: ").concat(t.attack,"<br/>Defense: ").concat(t.defense,"<br/>Type: ").concat(d[t.type_1]).concat(d[t.type_2]?"/"+d[t.type_2]:"")).style("left",u.j(this)[0]+30+"px").style("top",u.j(this)[1]+30+"px")),b=!b})).transition().attr("r",(function(t){return v(t.hp)})).duration(1200);var x=u.p("#bubblePlot").append("div").style("opacity",0).attr("class","tooltip")};if(void 0!==e){var r=t.filter((function(t){return t.generation===e}));r.length!==t.length&&n(r)}else t.length===x.length&&void 0!==e||n(t),x=t}(t,n)}))}),[n,i,m,k]),Object(r.jsxs)("div",{className:"App",children:[Object(r.jsxs)("div",{className:"header",children:[Object(r.jsx)("img",{src:A,alt:"pokemonLogo"}),Object(r.jsxs)("div",{className:"option",children:["Applied Generation Filter:"," ",Object(r.jsxs)("span",{style:{color:p[n]},children:[y[n]," "]}),Object(r.jsx)("br",{}),"Applied Primary Type Filter:"," ",Object(r.jsx)("span",{style:{color:h[m]},children:d[m]}),Object(r.jsx)("div",{className:"resetFilterBtn",children:Object(r.jsx)("button",{onClick:function(){i(void 0),k(void 0)},children:"Reset Filter"})})]})]}),Object(r.jsxs)("div",{className:"mid",children:[Object(r.jsxs)("div",{className:"dashboardCard",children:[Object(r.jsxs)("div",{className:"dashboardCardTitle",children:["Distribution of Pokemon",void 0===m?" by Primary ":Object(r.jsxs)("span",{children:[" with",Object(r.jsxs)("span",{style:{color:h[m]},children:[" ",d[m]," "]}),"as Secondary "]}),"Type"]}),Object(r.jsx)("div",{id:"barChart"})]}),Object(r.jsxs)("div",{className:"dashboardCard",children:[Object(r.jsx)("div",{className:"dashboardCardTitle",children:"Distribution of Pokemon added in each Generation"}),Object(r.jsx)("div",{id:"pieChart",style:{paddingTop:"20px"}})]})]}),Object(r.jsxs)("div",{className:"mid",children:[Object(r.jsxs)("div",{className:"dashboardCard",style:{padding:"0 40px"},children:[Object(r.jsx)("div",{className:"dashboardCardTitle",children:"Strength of Legendary Pokemon rated by HP, Atk, Def"}),Object(r.jsx)("div",{id:"bubblePlot",style:{paddingTop:"20px"}})]}),Object(r.jsxs)("div",{className:"dashboardCard",style:{width:"710px"},children:[Object(r.jsx)("div",{className:"dashboardCardTitle",children:"Link between Primary and Secondary Type"}),Object(r.jsx)("div",{style:{paddingTop:"5px"},id:"chordDiagram"})]})]}),Object(r.jsx)("div",{className:"charizard",children:Object(r.jsx)("img",{src:j,alt:"charizard"})})]})};l.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(k,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.7c577255.chunk.js.map