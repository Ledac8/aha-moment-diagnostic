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
        // 1. Record the stall for the dashboard
        let currentStalls = parseInt(localStorage.getItem('stall_count') || 0);
        localStorage.setItem('stall_count', currentStalls + 1);

        // 2. Create the visual nudge
        const nudgeBox = document.createElement('div');
        nudgeBox.style = "position:fixed;bottom:20px;right:20px;background:#ffefd5;padding:15px;border:2px solid orange;border-radius:8px;z-index:1000;box-shadow: 0 4px 6px rgba(0,0,0,0.1);";
        nudgeBox.innerHTML = `<strong>Struggling with ${event}?</strong><br>Check the dashboard for TTV data.`;
        document.body.appendChild(nudgeBox);
    }
