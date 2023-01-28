import { surpriseMePrompts } from "../constants";

import FileSaver from 'file-saver'

//隨機抽一個裡面的句子出來
export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() *
    surpriseMePrompts.length); 
    const randomPrompt = surpriseMePrompts[randomIndex];

    //避免拿到重覆的
    if(randomPrompt === prompt) return getRandomPrompt(prompt)

    return randomPrompt
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}