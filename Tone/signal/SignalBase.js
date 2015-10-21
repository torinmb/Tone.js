define(["Tone/core/Tone", "Tone/core/Param", "Tone/core/TimelineParam"], function(Tone){

	"use strict";

	/**
	 *  @class  Base class for all Signals. Used Internally. 
	 *
	 *  @constructor
	 *  @extends {Tone}
	 */
	Tone.SignalBase = function(){};

	Tone.extend(Tone.SignalBase);

	/**
	 *  When signals connect to other signals or AudioParams, 
	 *  they take over the output value of that signal or AudioParam. 
	 *  For all other nodes, the behavior is the same as a default <code>connect</code>. 
	 *
	 *  @override
	 *  @param {AudioParam|AudioNode|Tone.Signal|Tone} node 
	 *  @param {number} [outputNumber=0] The output number to connect from.
	 *  @param {number} [inputNumber=0] The input number to connect to.
	 *  @returns {Tone.SignalBase} this
	 */
	Tone.SignalBase.prototype.connect = function(node, outputNumber, inputNumber){
		//zero it out so that the signal can have full control
		if ([Tone.Signal, Tone.Param, Tone.TimelineParam].indexOf(node.constructor) !== -1){
			//cancel changes
			node._param.cancelScheduledValues(0);
			//reset the value
			node._param.value = 0;
			//mark the value as overridden
			node.overridden = true;
		} else if (node instanceof AudioParam){
			node.cancelScheduledValues(0);
			node.value = 0;
		} 
		Tone.prototype.connect.call(this, node, outputNumber, inputNumber);
		return this;
	};

	return Tone.SignalBase;
});