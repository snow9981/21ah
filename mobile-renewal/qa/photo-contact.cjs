const fs = require('node:fs');
const path = require('node:path');
const sharp = require('C:/Users/Jiseong/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const source = 'C:/Users/Jiseong/Desktop/공유폴더/동물병원 자료/스물하나동물병원 전문가 사진';
const files = fs.readdirSync(source).filter(f=>/\.(jpg|png)$/i.test(f)).sort((a,b)=>a.localeCompare(b,'ko',{numeric:true}));
(async()=>{
  fs.writeFileSync(path.join(__dirname,'photo-index.json'),JSON.stringify(files,null,2));
  for(let start=0;start<files.length;start+=20){
    const tiles=[];
    for(let i=start;i<Math.min(start+20,files.length);i++){
      const x=((i-start)%4)*320,y=Math.floor((i-start)/4)*240;
      const thumb=await sharp(path.join(source,files[i])).rotate().resize(312,208,{fit:'inside'}).toBuffer();
      tiles.push({input:thumb,left:x,top:y});
      tiles.push({input:Buffer.from(`<svg width="312" height="28"><rect width="312" height="28" fill="white"/><text x="8" y="20" font-size="18" fill="black">${i+1} / ${files[i].replace('스물하나','Photo').replace('외관 수정','Exterior edited').replace('외관','Exterior')}</text></svg>`),left:x,top:y+210});
    }
    await sharp({create:{width:1280,height:Math.ceil(Math.min(20,files.length-start)/4)*240,channels:3,background:'#eeeeee'}}).composite(tiles).jpeg({quality:85}).toFile(path.join(__dirname,`contact-${Math.floor(start/20)+1}.jpg`));
  }
})();
