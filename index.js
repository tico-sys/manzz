require("./all/global")

const func = require("./all/place")
const readline = require("readline");
const usePairingCode = true
const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};

async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.red.bold(`
𝐌𝐚𝐬𝐮𝐤𝐚𝐧 𝐍𝐨𝐦𝐨𝐫 𝐊𝐚𝐦𝐮 𝐁𝐞𝐫𝐚𝐰𝐚𝐥 (𝐂𝐨𝐝𝐞 𝐍𝐞𝐠𝐚𝐫𝐚)
\n\n\n
           <|>  MANZ MODS 🎭 <|>\n\n\n
\n\n\n
<> 𝐒𝐜𝐫𝐢𝐩𝐭 𝐁𝐲 <> : ManzMods
<> 𝐕𝐞𝐫𝐢𝐬𝐨𝐧 𝐒𝐜𝐫𝐢𝐩𝐭 <> : ${versisc}
<> 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 𝐃𝐞𝐯 <> : @Manzz
<> 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 𝐃𝐞𝐯 <> : @Manzz
<> 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐃𝐞𝐯 <> : +62 857-2426-9841

𝐓𝐚𝐧𝐤𝐬 𝐘𝐨𝐮 𝐁𝐮𝐲 𝐒𝐜𝐫𝐢𝐩𝐭 𝐌𝐞 :)`))
const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "fatal" }),
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]   
// browser: ['Chrome (Linux)', '', '']
}
const vipbug = func.makeWASocket(connectionOptions)
if(usePairingCode && !vipbug.authState.creds.registered) {
		const phoneNumber = await question(chalk.green('\nEnter Your Number\nNumber : '));
		const code = await vipbug.requestPairingCode(phoneNumber.trim())
		console.log(chalk.green(`Your Pairing Code : ${code} `))

	}
store.bind(vipbug.ev)

vipbug.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
vipbug.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
vipbug.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
vipbug.sendMessage(`6285724269841@s.whatsapp.net`, { text: `\`𝐇𝐚𝐥𝐨\`
  𝐌𝐚𝐧𝐳𝐌𝐨𝐝𝐬𝐕𝐞𝐫𝐬𝐢𝐨𝐧${versisc} 𝐁𝐞𝐫𝐡𝐚𝐬𝐢𝐥 𝐓𝐞𝐫𝐬𝐚𝐦𝐛𝐮𝐧𝐠`})
if (autoJoin) {
vipbug.groupAcceptInvite(codeInvite)
}
}
})

vipbug.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return vipbug.readMessages([m.key])
if (!vipbug.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(vipbug, m, store)
require("./ManzCas")(vipbug, m, store)
} catch (err) {
console.log(err)
}
})

vipbug.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = vipbug.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

vipbug.public = true

vipbug.ev.on('creds.update', saveCreds)
return vipbug
}

startSesi()

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})