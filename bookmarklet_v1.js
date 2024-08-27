javascript:(async function(){
    try {
        const userPrompt = prompt('Slackに入力するテキストを生成するためのプロンプトを入力してください:');
        if (!userPrompt) {
            alert('プロンプトが入力されていません。');
            return;
        }

        const mood = prompt('生成するテキストの雰囲気を指定してください（例：カジュアル、丁寧、ビジネスなど）:\n何も入力しない場合、デフォルトの文言を使用します。');
        const session = await ai.assistant.create();
        const finalPrompt = mood ? `${userPrompt} このテキストは「${mood}」な雰囲気で書いてください。` : userPrompt;
        const result = await session.prompt(finalPrompt);
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT' || activeElement.isContentEditable)) {
            if (activeElement.isContentEditable) {
                activeElement.textContent += result.trim();
            } else {
                const start = activeElement.selectionStart;
                const end = activeElement.selectionEnd;
                activeElement.value = activeElement.value.slice(0, start) + result.trim() + activeElement.value.slice(end);
                activeElement.selectionStart = activeElement.selectionEnd = start + result.trim().length;
            }
            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true
            });
            activeElement.dispatchEvent(inputEvent);
        } else {
            console.log('入力フィールドが見つかりませんでした。');
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
