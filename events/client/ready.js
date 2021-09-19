module.exports = async(client) => {
try {
      client.user.setActivity("Test",{
        type: "LISTENING",
      });
    } catch (e) {
      client.logger.error(e)
    }
  
  //log
client.logger.ready("Successfully initalised the bot")
  
}
