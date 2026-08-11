"use client";

import { useEffect, useState } from "react";

export type AgentStatus = "idle" | "searching_books" | "searching_server" | "thinking" | "talking";

interface PixelOfficeProps {
  status: AgentStatus;
}

function targetXForStatus(status: AgentStatus) {
  switch (status) {
    case "searching_books":
      return 50; // Bookshelf
    case "searching_server":
      return 80; // Server Rack
    default:
      return 18; // Desk
  }
}

function bubbleTextForStatus(status: AgentStatus) {
  switch (status) {
    case "idle":
      return "Zzz...";
    case "searching_books":
      return "📚 Searching...";
    case "searching_server":
      return "💾 DB Query...";
    case "thinking":
      return "🧠 Reasoning...";
    case "talking":
      return "💬 Talking...";
  }
}

export default function PixelOffice({ status }: PixelOfficeProps) {
  // Coordinates in percentage (%)
  const [currentX, setCurrentX] = useState(18); // Default at Desk (18%)
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");

  // Sync state machine logic: kicks off a setTimeout-driven walk animation
  // whenever `status` changes, so the setState calls below are genuinely
  // synchronizing with an external timer, not derivable render state.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const target = targetXForStatus(status);
    const text = bubbleTextForStatus(status);

    // If target position changes, trigger walking state
    if (target !== currentX) {
      setDirection(target > currentX ? "right" : "left");
      setIsWalking(true);
      setShowBubble(false); // Hide speech bubble while walking

      // Walking duration matches the CSS transition time
      const walkTimeout = setTimeout(() => {
        setIsWalking(false);
        setCurrentX(target);
        if (text) {
          setBubbleText(text);
          setShowBubble(true);
        }
      }, 1500); // 1.5 seconds walk time

      return () => clearTimeout(walkTimeout);
    } else {
      // If position is the same but status changed, just update bubble text
      setIsWalking(false);
      if (text) {
        setBubbleText(text);
        setShowBubble(true);
      } else {
        setShowBubble(false);
      }
    }
  }, [status, currentX]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Hide bubble sometimes during idle so it's not permanently sleeping
  useEffect(() => {
    if (status === "idle") {
      const bubbleTimer = setTimeout(() => {
        setShowBubble(false);
      }, 5000);
      return () => clearTimeout(bubbleTimer);
    }
  }, [status, bubbleText]);

  const isAtDesk = currentX === 18 && !isWalking;

  return (
    <div className="relative w-full h-[130px] bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden font-mono select-none">
      {/* Custom Styles for Keyframe Animations */}
      <style>{`
        @keyframes pixel-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-pixel-walk {
          animation: pixel-bounce 0.35s infinite ease-in-out;
        }
        @keyframes typing-shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(0.5px, -0.5px); }
          75% { transform: translate(-0.5px, 0.5px); }
        }
        .animate-typing-hands {
          animation: typing-shake 0.15s infinite;
        }
        @keyframes led-blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-led {
          animation: led-blink 0.5s infinite;
        }
        @keyframes bubble-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bubble {
          animation: bubble-float 2s infinite ease-in-out;
        }
        @keyframes screen-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        .animate-screen {
          animation: screen-glow 1.5s infinite ease-in-out;
        }
        @keyframes code-stream {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-code-flow {
          animation: code-stream 2s infinite linear;
        }
      `}</style>

      {/* Retro Wall Background Elements */}
      <div className="absolute inset-0 bg-slate-900" style={{ height: "110px" }} />
      
      {/* Blueprint background grid pattern on the wall */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:10px_10px]" style={{ height: "110px" }} />

      {/* Cyber/Neon cyan boundary line representing the floor edge */}
      <div className="absolute left-0 right-0 h-[2px] bg-cyan-500/25 border-b border-cyan-500/10" style={{ top: "110px" }} />

      {/* Dark Floor */}
      <div className="absolute left-0 right-0 bottom-0 bg-slate-950" style={{ height: "20px" }} />

      {/* Floor Tiles Perspective Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[20px] opacity-[0.15] overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-0 w-[1px] h-full bg-slate-400 origin-top transform rotate-[-45deg]"></div>
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-slate-400"></div>
        <div className="absolute left-3/4 top-0 w-[1px] h-full bg-slate-400 origin-top transform rotate-[45deg]"></div>
      </div>

      {/* ==== FURNITURE LAYER ==== */}

      {/* 1. Bookshelf (RAG Database) */}
      <div className="absolute" style={{ left: "50%", bottom: "16px", transform: "translateX(-50%)" }}>
        <svg width="36" height="50" viewBox="0 0 36 50" shapeRendering="crispEdges" className="opacity-90 dark:opacity-100">
          {/* Wooden Frame */}
          <rect x="0" y="0" width="36" height="50" fill="#78350f" />
          <rect x="2" y="2" width="32" height="46" fill="#451a03" />
          {/* Shelves */}
          <rect x="2" y="14" width="32" height="2" fill="#78350f" />
          <rect x="2" y="28" width="32" height="2" fill="#78350f" />
          <rect x="2" y="42" width="32" height="2" fill="#78350f" />
          {/* Books Row 1 */}
          <rect x="4" y="4" width="3" height="10" fill="#ef4444" />
          <rect x="8" y="6" width="3" height="8" fill="#3b82f6" />
          <rect x="12" y="4" width="4" height="10" fill="#10b981" />
          <rect x="17" y="5" width="3" height="9" fill="#eab308" />
          <rect x="21" y="4" width="3" height="10" fill="#a855f7" />
          <rect x="25" y="7" width="3" height="7" fill="#06b6d4" />
          <rect x="29" y="5" width="3" height="9" fill="#f43f5e" />
          {/* Books Row 2 */}
          <rect x="4" y="19" width="3" height="9" fill="#06b6d4" />
          <rect x="8" y="18" width="3" height="10" fill="#a855f7" />
          <rect x="12" y="21" width="4" height="7" fill="#eab308" />
          <rect x="18" y="18" width="3" height="10" fill="#ef4444" />
          <rect x="22" y="19" width="4" height="9" fill="#10b981" />
          <rect x="28" y="18" width="3" height="10" fill="#3b82f6" />
          {/* Books Row 3 */}
          <rect x="5" y="32" width="4" height="10" fill="#10b981" />
          <rect x="10" y="34" width="3" height="8" fill="#eab308" />
          <rect x="14" y="32" width="3" height="10" fill="#a855f7" />
          <rect x="18" y="33" width="4" height="9" fill="#ef4444" />
          <rect x="24" y="32" width="3" height="10" fill="#3b82f6" />
          <rect x="28" y="34" width="4" height="8" fill="#06b6d4" />
        </svg>
      </div>

      {/* 2. Server Rack (AI LLM Host) */}
      <div className="absolute" style={{ right: "10%", bottom: "16px" }}>
        <svg width="40" height="60" viewBox="0 0 40 60" shapeRendering="crispEdges" className="opacity-90 dark:opacity-100">
          {/* Dark Metallic Frame */}
          <rect x="0" y="0" width="40" height="60" fill="#334155" />
          <rect x="2" y="2" width="36" height="56" fill="#090d16" />
          
          {/* Server Blade 1 */}
          <rect x="4" y="6" width="32" height="8" fill="#1e293b" />
          <rect x="6" y="8" width="6" height="4" fill="#0f172a" />
          <rect x="14" y="9" width="2" height="2" fill="#06b6d4" className="animate-led" style={{ animationDelay: "0ms" }} />
          <rect x="18" y="9" width="2" height="2" fill="#10b981" className="animate-led" style={{ animationDelay: "200ms" }} />
          <rect x="22" y="9" width="10" height="2" fill="#334155" />

          {/* Server Blade 2 */}
          <rect x="4" y="18" width="32" height="8" fill="#1e293b" />
          <rect x="6" y="20" width="6" height="4" fill="#0f172a" />
          <rect x="14" y="21" width="2" height="2" fill="#06b6d4" className="animate-led" style={{ animationDelay: "150ms" }} />
          <rect x="18" y="21" width="2" height="2" fill="#ef4444" className="animate-led" style={{ animationDelay: "400ms" }} />
          <rect x="22" y="21" width="10" height="2" fill={status === "searching_server" ? "#06b6d4" : "#334155"} className={status === "searching_server" ? "animate-pulse" : ""} />

          {/* Server Blade 3 */}
          <rect x="4" y="30" width="32" height="8" fill="#1e293b" />
          <rect x="6" y="32" width="6" height="4" fill="#0f172a" />
          <rect x="14" y="33" width="2" height="2" fill="#eab308" className="animate-led" style={{ animationDelay: "300ms" }} />
          <rect x="18" y="33" width="2" height="2" fill="#10b981" className="animate-led" style={{ animationDelay: "100ms" }} />
          <rect x="22" y="33" width="10" height="2" fill="#334155" />

          {/* Server Blade 4 */}
          <rect x="4" y="42" width="32" height="8" fill="#1e293b" />
          <rect x="6" y="44" width="6" height="4" fill="#0f172a" />
          <rect x="14" y="45" width="2" height="2" fill="#06b6d4" className="animate-led" style={{ animationDelay: "500ms" }} />
          <rect x="18" y="45" width="2" height="2" fill="#eab308" className="animate-led" style={{ animationDelay: "250ms" }} />
          <rect x="22" y="45" width="10" height="2" fill={status === "searching_server" ? "#10b981" : "#334155"} className={status === "searching_server" ? "animate-pulse" : ""} />
        </svg>
      </div>

      {/* 3. Cozy Desk Plant (Potted Monstera/Succulent) */}
      <div className="absolute" style={{ left: "37%", bottom: "16px" }}>
        <svg width="14" height="22" viewBox="0 0 14 22" shapeRendering="crispEdges">
          {/* Pot */}
          <rect x="3" y="14" width="8" height="8" fill="#d97706" />
          <rect x="2" y="12" width="10" height="2" fill="#b45309" />
          {/* Stem & Leaves */}
          <rect x="6" y="7" width="2" height="5" fill="#047857" />
          <rect x="3" y="4" width="8" height="4" fill="#10b981" />
          <rect x="5" y="1" width="4" height="3" fill="#34d399" />
          <rect x="1" y="6" width="3" height="3" fill="#047857" />
          <rect x="10" y="6" width="3" height="3" fill="#047857" />
        </svg>
      </div>

      {/* ==== CHARACTER LAYER ==== */}
      <div
        className={`absolute z-10 transition-all duration-[1500ms] ease-in-out ${
          isWalking ? "animate-pixel-walk" : ""
        }`}
        style={{
          left: `${currentX}%`,
          bottom: "16px",
          transform: `translateX(-50%) ${direction === "left" ? "scaleX(-1)" : "scaleX(1)"}`,
        }}
      >
        {/* Wish (Avatar SVG) */}
        <svg
          width="20"
          height="32"
          viewBox="0 0 20 32"
          shapeRendering="crispEdges"
          className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
        >
          {/* Hair: Dark Slate/Blue-Black */}
          <rect x="4" y="0" width="12" height="6" fill="#0f172a" />
          <rect x="3" y="2" width="14" height="4" fill="#0f172a" />
          <rect x="2" y="4" width="16" height="2" fill="#0f172a" />
          
          {/* Skin: Light Peach */}
          <rect x="5" y="6" width="10" height="7" fill="#ffedd5" />
          {/* Hair Sideburns */}
          <rect x="4" y="6" width="2" height="4" fill="#0f172a" />
          <rect x="14" y="6" width="2" height="4" fill="#0f172a" />

          {/* Eyes (Flippable direction check handled by root scaleX) */}
          <rect x="6" y="8" width="2" height="2" fill="#1e293b" />
          <rect x="12" y="8" width="2" height="2" fill="#1e293b" />

          {/* Blushing cheek when talking */}
          {status === "talking" && (
            <>
              <rect x="5" y="10" width="1" height="1" fill="#f43f5e" opacity="0.6" />
              <rect x="14" y="10" width="1" height="1" fill="#f43f5e" opacity="0.6" />
            </>
          )}

          {/* Mouth: Neutral or Talking */}
          {status === "talking" ? (
            <rect x="9" y="11" width="2" height="2" fill="#e11d48" />
          ) : (
            <rect x="9" y="11" width="2" height="1" fill="#cbd5e1" />
          )}

          {/* Body/Shirt: Neon Cyan (Port Primary Accent) */}
          <rect x="4" y="13" width="12" height="10" fill="#06b6d4" />
          {/* Sleeves */}
          <rect x="2" y="14" width="2" height="6" fill="#0891b2" />
          <rect x="16" y="14" width="2" height="6" fill="#0891b2" />
          
          {/* Hands: Peach */}
          {!isAtDesk && (
            <>
              <rect x="2" y="20" width="2" height="2" fill="#ffedd5" />
              <rect x="16" y="20" width="2" height="2" fill="#ffedd5" />
            </>
          )}

          {/* Pants: Obsidian / Charcoal Slate */}
          <rect x="5" y="23" width="10" height="5" fill="#1e293b" />
          <rect x="4" y="24" width="12" height="1" fill="#0f172a" /> {/* Belt */}

          {/* Legs/Shoes (Normal legs) */}
          {/* When walking, bounce is applied. If sitting at desk, legs are hidden under the desk SVG. */}
          <rect x="5" y="28" width="3" height="4" fill="#0f172a" />
          <rect x="12" y="28" width="3" height="4" fill="#0f172a" />
          {/* Shoes details */}
          <rect x="4" y="31" width="4" height="1" fill="#475569" />
          <rect x="12" y="31" width="4" height="1" fill="#475569" />
        </svg>

        {/* Floating thought/speech bubble above the character's head */}
        {showBubble && bubbleText && (
          <div
            className="absolute bottom-[36px] left-[50%] transform translate-x-[-50%] bg-slate-900 border border-cyan-500/50 text-cyan-400 text-[9px] px-2 py-0.5 rounded font-mono whitespace-nowrap z-30 animate-bubble"
            style={{
              boxShadow: "0 0 5px rgba(6, 182, 212, 0.2)",
              transform: `translateX(-50%) ${direction === "left" ? "scaleX(-1)" : "scaleX(1)"}`
            }}
          >
            <div className="relative">
              {bubbleText}
              {/* Little speech tail pointing down */}
              <div className="absolute -bottom-[6px] left-[50%] transform translate-x-[-50%] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-slate-900"></div>
              <div className="absolute -bottom-[7px] left-[50%] transform translate-x-[-50%] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-cyan-500/50 -z-10"></div>
            </div>
          </div>
        )}
      </div>

      {/* ==== FOREGROUND / DESK LAYER ==== */}
      {/* Placed at left: 10% to overlap Wish when he sits down at the desk (x = 18%) */}
      <div className="absolute pointer-events-none" style={{ left: "10%", bottom: "16px" }}>
        <svg width="50" height="40" viewBox="0 0 50 40" shapeRendering="crispEdges">
          {/* Computer Stand */}
          <rect x="23" y="16" width="4" height="8" fill="#475569" />
          <rect x="20" y="23" width="10" height="1" fill="#334155" />
          
          {/* Retro Monitor Frame */}
          <rect x="13" y="2" width="24" height="16" fill="#64748b" />
          <rect x="14" y="3" width="22" height="14" fill="#475569" />
          
          {/* Computer Screen */}
          <rect x="15" y="4" width="20" height="12" fill="#020617" />
          
          {/* Screen Light Effect based on state */}
          {status === "thinking" || status === "talking" ? (
            <>
              {/* Glowing cyan screen */}
              <rect x="15" y="4" width="20" height="12" fill="#06b6d4" className="animate-screen" />
              {/* Simulating code scrolling on screen */}
              <g className="animate-code-flow">
                <rect x="16" y="5" width="8" height="1" fill="#ffffff" opacity="0.8" />
                <rect x="16" y="8" width="12" height="1" fill="#ffffff" opacity="0.6" />
                <rect x="16" y="11" width="6" height="1" fill="#ffffff" opacity="0.7" />
                <rect x="16" y="14" width="10" height="1" fill="#ffffff" opacity="0.9" />
              </g>
            </>
          ) : (
            <>
              {/* Idle screen display (blinking cursor prompt) */}
              <rect x="16" y="5" width="2" height="2" fill="#06b6d4" />
              <rect x="19" y="5" width="2" height="1" fill="#06b6d4" className="animate-pulse" />
            </>
          )}

          {/* Keyboard */}
          <rect x="18" y="22" width="14" height="2" fill="#94a3b8" />
          
          {/* Typing Hands Overlay - visible only when at desk and thinking/talking */}
          {isAtDesk && (status === "thinking" || status === "talking") && (
            <g className="animate-typing-hands" style={{ transformOrigin: "25px 23px" }}>
              {/* Little pinkish hands hovering over keyboard */}
              <rect x="19" y="20" width="2" height="2" fill="#ffedd5" />
              <rect x="29" y="20" width="2" height="2" fill="#ffedd5" />
            </g>
          )}

          {/* Desk Surface (drawn in front to cover the chair & legs) */}
          <rect x="0" y="24" width="50" height="4" fill="#92400e" />
          
          {/* Desk Drawers / Legs */}
          <rect x="2" y="28" width="6" height="12" fill="#78350f" />
          <rect x="3" y="30" width="4" height="2" fill="#451a03" />
          <rect x="3" y="34" width="4" height="2" fill="#451a03" />
          <rect x="42" y="28" width="6" height="12" fill="#78350f" />
          <rect x="43" y="30" width="4" height="2" fill="#451a03" />
          <rect x="43" y="34" width="4" height="2" fill="#451a03" />
        </svg>
      </div>
    </div>
  );
}
