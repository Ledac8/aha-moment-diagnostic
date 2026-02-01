// Aha! Moment Diagnostic Hook
const TTV_Tracker = {
    startTime: Date.now(),
    events: {},
    thresholds: {
        "upload_data": 60000, // 60 seconds
        "create_project": 120000 // 120 seconds
    },

    track: function(eventName) {
        const timeTaken = Date.now() - this.startTime;
        this.events[eventName] = timeTaken;
        console.log(`Event: ${eventName} | TTV: ${timeTaken}ms`);
        
        // Check if user is "Stalling"
        if (timeTaken > this.thresholds[eventName]) {
            this.triggerNudge(eventName);
        }
    },

    triggerNudge: function(event) {
        const nudgeBox = document.createElement('div');
        nudgeBox.style = "position:fixed;bottom:20px;right:20px;background:#ffefd5;padding:15px;border:2px solid orange;z-index:1000;";
        nudgeBox.innerHTML = `<strong>Struggling with ${event}?</strong><br>Click here for a 30s video tutorial.`;
        document.body.appendChild(nudgeBox);
    }
};
