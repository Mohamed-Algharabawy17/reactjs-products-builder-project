
export function cutText(txt:string, max:number=150){
    if(txt.length >= max) return `${txt.slice(0,max)} ...`;
    return txt
}