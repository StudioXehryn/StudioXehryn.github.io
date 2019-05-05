//==============================================================================
// Xehryn_RandomChoiceOrder.js
//==============================================================================
 
var Imported = Imported || {};
Imported.Xehryn_RandomChoiceOrder = true;

/*:
* @plugindesc Randomize the order of choices in "Show Choices".
* @author Studio Xehryn (Henry Pan)
*
* @param Activation Switch
* @desc Choice order will be randomized when this switch is ON.
* @default 1
*
* @param
* @help 
* ------------------------------------------------------------------------------
* Information
* ------------------------------------------------------------------------------
* This simple plugin randomizes the choice list when you use "Show Choices".
* Great for stuff like trivia mini-games or something where you don't want the
* player to memorize the order of the choice list.
*
* To use, turn the switch designated as the Activation Switch ON. Choices will
* then be randomized until the switch is turned OFF.
*
* ------------------------------------------------------------------------------
* Terms of Use
* ------------------------------------------------------------------------------
* 1. Plugin is free for use in both commercial and non-commercial projects.
* 2. Attribution not required.
* 3. Do not redistribute this plugin or claim it as your own.
*/

(function () {
//==============================================================================
// Parameter Variables
//==============================================================================
var params = PluginManager.parameters("Xehryn_RandomChoiceOrder");
var switchID = Number(params["Activation Switch"]);

//==============================================================================
// Window_ChoiceList
//==============================================================================
Window_ChoiceList.prototype.makeCommandList = function() {
    // Duplicate the choices.
    var choices = $gameMessage.choices().clone();

    // Shuffle the choices.
    if ($gameSwitches.value(switchID)){
        for (var i = choices.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]];
        }
    }
    
    // Add the shuffled list to the choice command.
    for (var i = 0; i < choices.length; i++) {
        this.addCommand(choices[i], 'choice');
    }
};


Window_ChoiceList.prototype.callOkHandler = function() {
    // Lets the game know about the choices' new indices.
    if ($gameSwitches.value(switchID)){
        var realIndex = $gameMessage.choices().indexOf(this.commandName(this.index()));
        $gameMessage.onChoice(realIndex);
    } else {
        $gameMessage.onChoice(this.index());
    }
    this._messageWindow.terminateMessage();
    this.close();
};

})();