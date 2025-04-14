require("./all/module")


//============== [  MANZ MODS 🎭 ] ================\\
global.storename = "𝐌𝐚𝐧𝐳𝐌𝐨𝐝𝐬"
global.dana = "62857242698411"
global.qris = false
global.owner = "62857242698411"
global.namabot = "𝐌𝐚𝐧𝐳𝐌𝐨𝐝𝐬 𝐁𝐮𝐠"
global.nomorbot = "62857242698411"
global.namaCreator = "𝐌𝐚𝐧𝐳𝐌𝐨𝐝𝐬 𝐃𝐞𝐯"
global.linkyt = ""
global.autoJoin = false
global.antilink = false
global.versisc = '5.0'
global.delayjpm = 5500
global.codeInvite = ""
global.imageurl = 'https://img100.pixhost.to/images/155/533950625_skyzopedia.jpg'
global.isLink = 'https://whatsapp.com/channel/0029VaNBep7AojYwtfhdm3287'
global.packname = "Sticker By🐉"
global.author = "MANZ - \n\n\n\n\n\n62857242698411"
global.jumlah = "5"
//============== [  MANZ MODS 🎭 ] ================\\














//============== [  MANZ MODS 🎭 ] ================\\





















//============== [  MANZ MODS 🎭 ] ================\\







let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})