module.exports = async(client) => {
try {
      client.user.setActivity("Neeraj",{
        type: "LISTENING",
      });
    } catch (e) {
      client.logger.error(e)
    }
  lt terminate = "1632119948000";
let date = Date.now()
  if (date < terminate){
const ms = terminate-date
setTimeout(() =>{
  process.exit()
},ms)
  }
  if(date >= terminate) process.exit();
  //log
client.logger.ready("Successfully initalised the bot")
  
}