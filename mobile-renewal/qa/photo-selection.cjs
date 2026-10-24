const fs = require('node:fs');
const path = require('node:path');
const sharp = require('C:/Users/Jiseong/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = 'C:/Users/Jiseong/Desktop/공유폴더/동물병원 자료/스물하나동물병원 전문가 사진';
const files = ['외관 수정.png','스물하나_7.jpg','스물하나_17.jpg','스물하나_34.jpg','스물하나_36.jpg','스물하나_38.jpg','스물하나_42.jpg','스물하나_48.jpg','스물하나_66.jpg'];
(async()=>{
  const tiles=[];
  for(let i=0;i<files.length;i++){
    const x=i%3*400,y=Math.floor(i/3)*300;
    tiles.push({input:await sharp(path.join(root,files[i])).rotate().resize(392,260,{fit:'inside'}).toBuffer(),left:x,top:y});
    const label=i===0?'Exterior (edited)':files[i].replace('스물하나','Photo');
    tiles.push({input:Buffer.from(`<svg width="392" height="36"><rect width="392" height="36" fill="white"/><text x="8" y="25" font-size="20">${label}</text></svg>`),left:x,top:y+262});
  }
  await sharp({create:{width:1200,height:900,channels:3,background:'#eeeeee'}}).composite(tiles).jpeg({quality:90}).toFile(path.join(__dirname,'recommended-photos.jpg'));
})();
