"use client";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import React, { useEffect, useRef, useState } from "react";

import imageBg from "../assets/image1.png";
import logo from "../assets/file.png";
import { useSearchParams } from "next/navigation";

interface Drawing {
  type: string;
  color: string;
  points?: { x: number; y: number }[]; // For freehand
  startPos?: { x: number; y: number };
  endPos?: { x: number; y: number };
}

const Whiteboard: React.FC = () => {
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("black");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("freehand");
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [undoneDrawings, setUndoneDrawings] = useState<Drawing[]>([]);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null); // SignalR connection to the server

  const whiteboardId = searchParams.get("id");

  useEffect(() => {
    // Setup canvas
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth; // Adjust canvas size
      canvas.height = window.innerHeight;
      const img = new Image();
      img.src = imageBg.src; // Replace with your image path
      img.onload = () => {
        setBackgroundImage(img);
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
    }

    // Establish SignalR connection
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5101/hubs/whiteboard")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(connect);
    connect
      .start()
      .then(() => {
        // Set event listener
        connect.on("ReceiveDrawing", (drawing: Drawing) => {
          setDrawings((prevDrawings) => [...prevDrawings, drawing]);
        });
        connect.on("RetrieveDrawing", (drawings: Drawing[]) => {
          console.log("Retrieved drawings: ", drawings);
          if (drawings != null) setDrawings(drawings);
        });
        connect.on("RemoveDrawing", (drawing: Drawing) => {
          connect.invoke("RetrieveDrawing", whiteboardId);
        });
        connect.on("ClearWhiteboard", () => {
          setDrawings([]);
          clearCanvas();
        });

        // Join the group corresponding to the whiteboard ID
        console.log("Joining whiteboard...");
        connect
          .invoke("JoinWhiteboard", whiteboardId)
          .then(() => {
            // Retrieve existing drawings
            console.log("Connected successfully!");
            connect.invoke("RetrieveDrawing", whiteboardId);
          })
          .catch((err) => console.error("Could not join group: ", err));
      })
      .catch((err) =>
        console.error("Error while connecting to SignalR Hub: ", err)
      );

    return () => {
      if (connection) {
        connection.off("ReceiveDrawing");
      }
    };
  }, []);

  useEffect(() => {
    redrawCanvas();
  }, [drawings]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.strokeStyle = color; // Set the stroke color to the current selected color
      context.lineWidth = color === "white" ? 20 : 5; // Broader line for eraser
      context.lineCap = "round";
      setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      if (mode === "freehand") {
        context.beginPath();
        context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setDrawings([
          ...drawings,
          {
            type: mode,
            color: color,
            points: [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }],
          },
        ]);
      }
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = color === "white" ? 20 : 5; // Broader line for eraser
      context.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      if (backgroundImage) {
        context.drawImage(
          backgroundImage,
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );
      }
      redrawCanvas();

      if (mode === "freehand") {
        const currentDrawing = drawings[drawings.length - 1];
        if (currentDrawing.points) {
          currentDrawing.points.push({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
          });
        }
        context.beginPath();
        context.moveTo(startPos.x, startPos.y);
        currentDrawing.points?.forEach((point) => {
          context.lineTo(point.x, point.y);
        });
        context.stroke();
        setDrawings([...drawings]); // Update drawings state
      } else if (mode === "line") {
        context.strokeStyle = color;
        context.lineWidth = color === "white" ? 20 : 5;
        context.beginPath();
        context.moveTo(startPos.x, startPos.y);
        context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        context.stroke();
      } else if (mode === "rectangle") {
        context.strokeStyle = color;
        context.lineWidth = color === "white" ? 20 : 5;
        const width = e.nativeEvent.offsetX - startPos.x;
        const height = e.nativeEvent.offsetY - startPos.y;
        context.strokeRect(startPos.x, startPos.y, width, height);
      } else if (mode === "circle") {
        context.strokeStyle = color;
        context.lineWidth = color === "white" ? 20 : 5;
        const radius = Math.sqrt(
          Math.pow(e.nativeEvent.offsetX - startPos.x, 2) +
            Math.pow(e.nativeEvent.offsetY - startPos.y, 2)
        );
        context.beginPath();
        context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        context.stroke();
      }
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!startPos) return;
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      let newDrawing: Drawing;
      if (mode !== "freehand") {
        newDrawing = {
          type: mode,
          color: color,
          startPos: startPos,
          endPos: { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
        };
        setDrawings([...drawings, newDrawing]);
      } else {
        newDrawing = drawings[drawings.length - 1];
      }
      context.closePath();
      setIsDrawing(false);
      setUndoneDrawings([]); // Clear the undone drawings stack when a new drawing is made

      // Send the drawing to the server
      if (connection) {
        connection.invoke("SendDrawing", whiteboardId, newDrawing);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (backgroundImage) {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      }
      setDrawings([]);
      setUndoneDrawings([]);
    }
  };

  const redrawCanvas = () => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      if (backgroundImage) {
        context.drawImage(
          backgroundImage,
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );
      }
      drawings.forEach((drawing) => {
        context.strokeStyle = drawing.color;
        context.lineWidth = drawing.color === "white" ? 20 : 5; // Broader line for eraser
        context.lineCap = "round";
        if (drawing.type === "freehand") {
          context.beginPath();
          context.moveTo(drawing.points![0].x, drawing.points![0].y);
          drawing.points?.forEach((point) => {
            context.lineTo(point.x, point.y);
          });
          context.stroke();
        } else if (drawing.type === "line") {
          context.beginPath();
          context.moveTo(drawing.startPos!.x, drawing.startPos!.y);
          context.lineTo(drawing.endPos!.x, drawing.endPos!.y);
          context.stroke();
        } else if (drawing.type === "rectangle") {
          const width = drawing.endPos!.x - drawing.startPos!.x;
          const height = drawing.endPos!.y - drawing.startPos!.y;
          context.strokeRect(
            drawing.startPos!.x,
            drawing.startPos!.y,
            width,
            height
          );
        } else if (drawing.type === "circle") {
          const radius = Math.sqrt(
            Math.pow(drawing.endPos!.x - drawing.startPos!.x, 2) +
              Math.pow(drawing.endPos!.y - drawing.startPos!.y, 2)
          );
          context.beginPath();
          context.arc(
            drawing.startPos!.x,
            drawing.startPos!.y,
            radius,
            0,
            2 * Math.PI
          );
          context.stroke();
        }
      });
    }
  };

  const undo = () => {
    // if (drawings.length > 0) {
    //   const lastDrawing = drawings.pop()!;
    //   setDrawings([...drawings]);
    //   setUndoneDrawings([...undoneDrawings, lastDrawing]);
    // }
    // redrawCanvas();
    // redrawCanvas();
    connection?.invoke("UndoLastDrawing", whiteboardId);
  };

  const redo = () => {
    // if (undoneDrawings.length > 0) {
    //   const lastUndoneDrawing = undoneDrawings.pop()!;
    //   setDrawings([...drawings, lastUndoneDrawing]);
    //   redrawCanvas();
    // }
    connection?.invoke("RedoLastUndoneDrawing", whiteboardId);
  };

  return (
    <div className="flex bg-gradient-to-tr from-sky-100 to-indigo-200">
      <div className="w-1/10 h-screen bg-gradient-to-tr from-sky-100 to-indigo-200  p-4">
        {/* <h2 className="text-xl mb-4">Choose a color:</h2> */}
        <div className="space-y-2 flex flex-col items-center">
          <div>
            <button className="mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </button>
            {/* <img src="" alt="" /> */}
          </div>
          <button
            className="w-9 h-9 p-2 bg-black text-white rounded-3xl"
            onClick={() => setColor("black")}
          ></button>
          <button
            className="w-9 h-9 p-2 bg-pink-300 text-white rounded-3xl"
            onClick={() => setColor("#F9A8D4")}
          ></button>
          <button
            className="w-9 h-9 p-2 bg-cyan-500 text-white rounded-3xl"
            onClick={() => setColor("#06B6D4")}
          ></button>
          <button
            className="w-9 h-9 p-2 bg-lime-400 text-white rounded-3xl"
            onClick={() => setColor("#A3E635")}
          ></button>
          <button
            className="w-9 h-9 p-2 bg-yellow-200 text-white rounded-3xl"
            onClick={() => setColor("#FEF08A")}
          ></button>
          <button
            className="p-2 bg-green-50 text-gray-700 rounded-3xl"
            onClick={() => setColor("white")}
          >
            <svg
              fill="#000000"
              height="24px"
              width="24px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480.001 480.001"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M333.142,350.846c0.115-0.115,0.215-0.239,0.323-0.357l129.681-129.706c10.878-10.878,16.864-25.368,16.855-40.8 c-0.01-15.409-5.999-29.865-16.854-40.694l-97.844-97.874c-10.853-10.845-25.326-16.817-40.75-16.817 c-15.426,0-29.895,5.974-40.741,16.82L16.855,308.329C5.974,319.21-0.012,333.713,0,349.168 c0.013,15.425,6.002,29.884,16.854,40.7l62.592,62.606c0.061,0.061,0.127,0.112,0.188,0.171c0.174,0.165,0.349,0.331,0.534,0.483 c0.082,0.067,0.171,0.126,0.255,0.19c0.175,0.135,0.349,0.271,0.532,0.395c0.07,0.047,0.145,0.085,0.215,0.13 c0.205,0.131,0.412,0.26,0.627,0.376c0.051,0.026,0.103,0.048,0.154,0.074c0.239,0.123,0.482,0.241,0.732,0.346 c0.033,0.014,0.067,0.024,0.101,0.037c0.269,0.108,0.54,0.208,0.819,0.293c0.034,0.011,0.07,0.017,0.104,0.027 c0.276,0.081,0.556,0.154,0.841,0.211c0.082,0.017,0.165,0.023,0.247,0.038c0.239,0.041,0.479,0.084,0.724,0.107 c0.33,0.033,0.663,0.051,0.998,0.051h137.91h159.308c5.522,0,10-4.478,10-10c0-5.522-4.478-10-10-10H248.566l84.22-84.236 C332.904,351.06,333.027,350.96,333.142,350.846z M220.285,435.404H90.66l-59.675-59.689 c-7.076-7.054-10.977-16.487-10.985-26.563c-0.008-10.106,3.897-19.582,10.996-26.681l129.825-129.803l151.091,151.091 L220.285,435.404z M174.965,178.527L297.953,55.56c7.069-7.069,16.516-10.963,26.6-10.963c10.085,0,19.536,3.895,26.609,10.962 l97.85,97.88c7.08,7.063,10.982,16.493,10.989,26.557c0.006,10.085-3.899,19.547-10.998,26.645l-122.95,122.974L174.965,178.527z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
          <button
            className=" p-2 bg-blue-100 text-gray-700 rounded-3xl"
            onClick={() => setMode("freehand")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            className=" p-2 bg-indigo-100 text-gray-700 rounded-3xl"
            onClick={() => setMode("line")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14"
              />
            </svg>
          </button>
          <button
            className=" p-2 bg-purple-100 text-gray-700 rounded-3xl"
            onClick={() => setMode("rectangle")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
              />
            </svg>
          </button>
          <button
            className=" p-2 bg-pink-100 text-gray-700 rounded-3xl"
            onClick={() => setMode("circle")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              {/* <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" /> */}
            </svg>
          </button>
          <button
            className="p-2 bg-orange-100 text-gray-600 rounded-3xl"
            onClick={undo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>
          <button
            className="p-2 bg-orange-100 text-gray-600 rounded-3xl"
            onClick={redo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
              />
            </svg>
          </button>
          <button
            className="p-2 bg-red-100 text-red-600 rounded-3xl"
            onClick={() => {
              connection?.invoke("ClearWhiteboard", whiteboardId);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      />
    </div>
  );
};

export default Whiteboard;

//"use client";
// import React, { useRef, useState, useEffect } from 'react';

// interface Drawing {
//   type: string;
//   color: string;
//   points?: { x: number, y: number }[]; // For freehand
//   startPos?: { x: number, y: number };
//   endPos?: { x: number, y: number };
// }

// const Whiteboard: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [color, setColor] = useState<string>('black');
//   const [isDrawing, setIsDrawing] = useState<boolean>(false);
//   const [mode, setMode] = useState<string>('freehand'); // 'freehand', 'line', 'rectangle', or 'circle'
//   const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);
//   const [drawings, setDrawings] = useState<Drawing[]>([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.width = window.innerWidth * 0.8; // Adjust canvas size
//       canvas.height = window.innerHeight;
//     }
//   }, []);

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const context = canvasRef.current?.getContext('2d');
//     if (context) {
//       context.strokeStyle = color;
//       context.lineWidth = 5;
//       context.lineCap = 'round';
//       setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
//       if (mode === 'freehand') {
//         context.beginPath();
//         context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//         setDrawings([...drawings, { type: mode, color: color, points: [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }] }]);
//       }
//       setIsDrawing(true);
//     }
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !startPos) return;
//     const context = canvasRef.current?.getContext('2d');
//     if (context) {
//       context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
//       redrawCanvas();

//       if (mode === 'freehand') {
//         const currentDrawing = drawings[drawings.length - 1];
//         if (currentDrawing.points) {
//           currentDrawing.points.push({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
//         }
//         context.beginPath();
//         context.moveTo(startPos.x, startPos.y);
//         currentDrawing.points?.forEach(point => {
//           context.lineTo(point.x, point.y);
//         });
//         context.stroke();
//       } else if (mode === 'line') {
//         context.beginPath();
//         context.moveTo(startPos.x, startPos.y);
//         context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//         context.stroke();
//       } else if (mode === 'rectangle') {
//         const width = e.nativeEvent.offsetX - startPos.x;
//         const height = e.nativeEvent.offsetY - startPos.y;
//         context.strokeRect(startPos.x, startPos.y, width, height);
//       } else if (mode === 'circle') {
//         const radius = Math.sqrt(Math.pow(e.nativeEvent.offsetX - startPos.x, 2) + Math.pow(e.nativeEvent.offsetY - startPos.y, 2));
//         context.beginPath();
//         context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
//         context.stroke();
//       }
//     }
//   };

//   const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!startPos) return;
//     const context = canvasRef.current?.getContext('2d');
//     if (context) {
//       if (mode !== 'freehand') {
//         const newDrawing: Drawing = {
//           type: mode,
//           color: color,
//           startPos: startPos,
//           endPos: { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
//         };
//         setDrawings([...drawings, newDrawing]);
//       }
//       context.closePath();
//       setIsDrawing(false);
//     }
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext('2d');
//     if (canvas && context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       setDrawings([]);
//     }
//   };

//   const redrawCanvas = () => {
//     const context = canvasRef.current?.getContext('2d');
//     if (context) {
//       drawings.forEach(drawing => {
//         context.strokeStyle = drawing.color;
//         context.lineWidth = 5;
//         context.lineCap = 'round';
//         if (drawing.type === 'freehand') {
//           context.beginPath();
//           context.moveTo(drawing.points![0].x, drawing.points![0].y);
//           drawing.points?.forEach(point => {
//             context.lineTo(point.x, point.y);
//           });
//           context.stroke();
//         } else if (drawing.type === 'line') {
//           context.beginPath();
//           context.moveTo(drawing.startPos!.x, drawing.startPos!.y);
//           context.lineTo(drawing.endPos!.x, drawing.endPos!.y);
//           context.stroke();
//         } else if (drawing.type === 'rectangle') {
//           const width = drawing.endPos!.x - drawing.startPos!.x;
//           const height = drawing.endPos!.y - drawing.startPos!.y;
//           context.strokeRect(drawing.startPos!.x, drawing.startPos!.y, width, height);
//         } else if (drawing.type === 'circle') {
//           const radius = Math.sqrt(Math.pow(drawing.endPos!.x - drawing.startPos!.x, 2) + Math.pow(drawing.endPos!.y - drawing.startPos!.y, 2));
//           context.beginPath();
//           context.arc(drawing.startPos!.x, drawing.startPos!.y, radius, 0, 2 * Math.PI);
//           context.stroke();
//         }
//       });
//     }
//   };

//   return (
//     <div className="flex">
//       <div className="w-1/5 h-screen bg-gray-100 p-4">
//         <h2 className="text-xl mb-4">Choose a color:</h2>
//         <div className="space-y-2">
//           <button
//             className="w-full p-2 bg-black text-white rounded"
//             onClick={() => setColor('black')}
//           >
//             Black
//           </button>
//           <button
//             className="w-full p-2 bg-red-500 text-white rounded"
//             onClick={() => setColor('red')}
//           >
//             Red
//           </button>
//           <button
//             className="w-full p-2 bg-green-500 text-white rounded"
//             onClick={() => setColor('green')}
//           >
//             Green
//           </button>
//           <button
//             className="w-full p-2 bg-blue-500 text-white rounded"
//             onClick={() => setColor('blue')}
//           >
//             Blue
//           </button>
//           <button
//             className="w-full p-2 bg-gray-500 text-white rounded"
//             onClick={() => setColor('white')}
//           >
//             Eraser
//           </button>
//           <button
//             className="w-full p-2 bg-yellow-500 text-white rounded"
//             onClick={() => setMode('freehand')}
//           >
//             Freehand
//           </button>
//           <button
//             className="w-full p-2 bg-yellow-500 text-white rounded"
//             onClick={() => setMode('line')}
//           >
//             Draw Line
//           </button>
//           <button
//             className="w-full p-2 bg-yellow-500 text-white rounded"
//             onClick={() => setMode('rectangle')}
//           >
//             Draw Rectangle
//           </button>
//           <button
//             className="w-full p-2 bg-yellow-500 text-white rounded"
//             onClick={() => setMode('circle')}
//           >
//             Draw Circle
//           </button>
//           <button
//             className="w-full p-2 bg-red-700 text-white rounded"
//             onClick={clearCanvas}
//           >
//             Erase All
//           </button>
//         </div>
//       </div>
//       <canvas
//         ref={canvasRef}
//         className="border border-gray-300 bg-white"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         // onMouseLeave={stopDrawing}
//       />
//     </div>
//   );
// };

// export default Whiteboard;

// "use client";
// import React, { useRef, useState, useEffect } from 'react';

// const Whiteboard: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [color, setColor] = useState<string>('black');
//   const [isDrawing, setIsDrawing] = useState<boolean>(false);
//   const [mode, setMode] = useState<string>('line'); // 'line' or 'rectangle'
//   const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.width = window.innerWidth * 0.8; // Adjust canvas size
//       canvas.height = window.innerHeight;
//     }
//   }, []);

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const context = canvasRef.current?.getContext('2d');
//     if (context) {
//       context.strokeStyle = color;
//       context.lineWidth = 5;
//       context.lineCap = 'round';
//       setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
//       context.beginPath();
//       context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//       setIsDrawing(true);
//     }
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;
//     const context = canvasRef.current?.getContext('2d');
//     if (context) {
//       if (mode === 'line') {
//         context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//         context.stroke();
//       } else if (mode === 'rectangle' && startPos) {
//         const width = e.nativeEvent.offsetX - startPos.x;
//         const height = e.nativeEvent.offsetY - startPos.y;
//         context.clearRect(startPos.x, startPos.y, width, height);
//         redrawCanvas();
//         context.strokeRect(startPos.x, startPos.y, width, height);
//       }
//     }
//   };

//   const stopDrawing = () => {
//     const context = canvasRef.current?.getContext('2d');
//     if (context) {
//       context.closePath();
//       setIsDrawing(false);
//     }
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext('2d');
//     if (canvas && context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//     }
//   };

//   const redrawCanvas = () => {
//     // Placeholder for redrawing existing elements if needed
//   };

//   return (
//     <div className="flex">
//       <div className="w-1/5 h-screen bg-gray-100 p-4">
//         <h2 className="text-xl mb-4">Choose a color:</h2>
//         <div className="space-y-2">
//           <button
//             className="w-full p-2 bg-black text-white rounded"
//             onClick={() => setColor('black')}
//           >
//             Black
//           </button>
//           <button
//             className="w-full p-2 bg-red-500 text-white rounded"
//             onClick={() => setColor('red')}
//           >
//             Red
//           </button>
//           <button
//             className="w-full p-2 bg-green-500 text-white rounded"
//             onClick={() => setColor('green')}
//           >
//             Green
//           </button>
//           <button
//             className="w-full p-2 bg-blue-500 text-white rounded"
//             onClick={() => setColor('blue')}
//           >
//             Blue
//           </button>
//           <button
//             className="w-full p-2 bg-gray-500 text-white rounded"
//             onClick={() => setColor('white')}
//           >
//             Eraser
//           </button>
//           <button
//             className="w-full p-2 bg-yellow-500 text-white rounded"
//             onClick={() => setMode(mode === 'line' ? 'rectangle' : 'line')}
//           >
//             {mode === 'line' ? 'Draw Rectangle' : 'Draw Line'}
//           </button>
//           <button
//             className="w-full p-2 bg-red-700 text-white rounded"
//             onClick={clearCanvas}
//           >
//             Erase All
//           </button>
//         </div>
//       </div>
//       <canvas
//         ref={canvasRef}
//         className="border border-gray-300 bg-white"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//       />
//     </div>
//   );
// };

// export default Whiteboard;

// import React, { useRef, useState, useEffect, useCallback } from 'react';

// interface DrawElement {
//     type: 'line' | 'rectangle';
//     color: string;
//     startX: number;
//     startY: number;
//     endX: number;
//     endY: number;
// }

// const Whiteboard: React.FC = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [color, setColor] = useState<string>('black');
//     const [isDrawing, setIsDrawing] = useState<boolean>(false);
//     const [mode, setMode] = useState<string>('line'); // 'line' or 'rectangle'
//     const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);
//     const [elements, setElements] = useState<DrawElement[]>([]);

//     const redrawCanvas = useCallback(() => {
//         const canvas = canvasRef.current;
//         const context = canvas?.getContext('2d');
//         if (canvas && context) {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             elements.forEach((element) => {
//                 context.strokeStyle = element.color;
//                 context.lineWidth = 5;
//                 context.lineCap = 'round';
//                 context.beginPath();
//                 if (element.type === 'line') {
//                     context.moveTo(element.startX, element.startY);
//                     context.lineTo(element.endX, element.endY);
//                     context.stroke();
//                 } else if (element.type === 'rectangle') {
//                     const width = element.endX - element.startX;
//                     const height = element.endY - element.startY;
//                     context.strokeRect(element.startX, element.startY, width, height);
//                 }
//                 context.closePath();
//             });
//         }
//     }, [elements]);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (canvas) {
//             canvas.width = window.innerWidth * 0.8; // Adjust canvas size
//             canvas.height = window.innerHeight;
//             redrawCanvas();
//         }
//     }, [redrawCanvas]);

//     useEffect(() => {
//         redrawCanvas();
//     }, [elements, redrawCanvas]);

//     const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//         const context = canvasRef.current?.getContext('2d');
//         if (context) {
//             context.strokeStyle = color;
//             context.lineWidth = 5;
//             context.lineCap = 'round';
//             setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
//             context.beginPath();
//             context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//             setIsDrawing(true);
//         }
//         // setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
//         // setIsDrawing(true);
//     };

//     const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//         if (!isDrawing || !startPos) return;
//         const canvas = canvasRef.current;
//         if (canvas) {
//             const context = canvas.getContext('2d');
//             if (context) {
//                 context.clearRect(0, 0, canvas.width, canvas.height);
//                 redrawCanvas();
//                 if (mode === 'line') {
//                     context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//                     context.stroke();
//                 } else if (mode === 'rectangle') {
//                     const width = e.nativeEvent.offsetX - startPos.x;
//                     const height = e.nativeEvent.offsetY - startPos.y;
//                     context.strokeStyle = color;
//                     context.lineWidth = 5;
//                     context.strokeRect(startPos.x, startPos.y, width, height);
//                 }
//             }
//         }
//     };

//     const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//         if (!startPos) return;
//         if (mode === 'line') {
//             const context = canvasRef.current?.getContext('2d');
//             if (context) {
//                 context.closePath();
//                 setIsDrawing(false);
//             }
//         } else if (mode === 'rectangle') {
//             const newElement: DrawElement = {
//                 type: mode as 'line' | 'rectangle',
//                 color: color,
//                 startX: startPos.x,
//                 startY: startPos.y,
//                 endX: e.nativeEvent.offsetX,
//                 endY: e.nativeEvent.offsetY,
//             };
//             setElements((prevElements) => [...prevElements, newElement]);
//             setIsDrawing(false);
//         }

//     };

//     const clearCanvas = () => {
//         const canvas = canvasRef.current;
//         const context = canvas?.getContext('2d');
//         if (canvas && context) {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             setElements([]);
//         }
//     };

//     return (
//         <div className="flex">
//             <div className="w-1/5 h-screen bg-gray-100 p-4">
//                 <h2 className="text-xl mb-4">Choose a color:</h2>
//                 <div className="space-y-2">
//                     <button
//                         className="w-full p-2 bg-black text-white rounded"
//                         onClick={() => setColor('black')}
//                     >
//                         Black
//                     </button>
//                     <button
//                         className="w-full p-2 bg-red-500 text-white rounded"
//                         onClick={() => setColor('red')}
//                     >
//                         Red
//                     </button>
//                     <button
//                         className="w-full p-2 bg-green-500 text-white rounded"
//                         onClick={() => setColor('green')}
//                     >
//                         Green
//                     </button>
//                     <button
//                         className="w-full p-2 bg-blue-500 text-white rounded"
//                         onClick={() => setColor('blue')}
//                     >
//                         Blue
//                     </button>
//                     <button
//                         className="w-full p-2 bg-gray-500 text-white rounded"
//                         onClick={() => setColor('white')}
//                     >
//                         Eraser
//                     </button>
//                     <button
//                         className="w-full p-2 bg-yellow-500 text-white rounded"
//                         onClick={() => setMode(mode === 'line' ? 'rectangle' : 'line')}
//                     >
//                         {mode === 'line' ? 'Draw Rectangle' : 'Draw Line'}
//                     </button>
//                     <button
//                         className="w-full p-2 bg-red-700 text-white rounded"
//                         onClick={clearCanvas}
//                     >
//                         Erase All
//                     </button>
//                 </div>
//             </div>
//             <canvas
//                 ref={canvasRef}
//                 className="border border-gray-300 bg-white"
//                 onMouseDown={startDrawing}
//                 onMouseMove={draw}
//                 onMouseUp={stopDrawing}
//                 onMouseLeave={stopDrawing}
//             />
//         </div>
//     );
// };

// export default Whiteboard;