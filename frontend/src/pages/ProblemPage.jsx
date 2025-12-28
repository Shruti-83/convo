import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router'
import { PROBLEMS } from '../data/problems.js'
import Navbar from '../components/Navbar'
import { Group, Panel, Separator } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import { executeCode } from "../lib/piston.js";
import toast from "react-hot-toast"
import confetti from "canvas-confetti";






function ProblemPage() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [currentProblemId, setCurrentProblemId] = useState("two-sum")
    const [selectedLanguage, setSelectedLanguage] = useState("javascript")
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript)
    const [output, setOutput] = useState(null)
    const [isRunning, setIsRunning] = useState(false)

    const currentProblem = PROBLEMS[currentProblemId]

    // update ptoblem when url changes
    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id)
            setCode(PROBLEMS[id].starterCode[selectedLanguage])
            setOutput(null)
        }
    }, [id, selectedLanguage])

    const handleLanguageChange = (e) => {  const lang = e.target.value;
  setSelectedLanguage(lang);
  setCode(PROBLEMS[currentProblemId].starterCode[lang]);}
    const handleProblemChange = (newProblemId) => navigate(`/problems/${newProblemId}`)
    const triggerConfetti = () => {
        confetti({
            particleCount:80,
            spread:250,
            origin:{x:0.2, y:0.6}
        });
        confetti({
            particleCount:80,
            spread:250,
            origin:{
                x:0.8, y:0.6
            }
        })
     }
    const normalizeOutput = (output) => {
        return output
        .trim()
        .split("\n")
        .map((line)=>
            line.trim()
        //remove spaces after [ and before ]
        .replace(/\[\s+/g,"[")
        .replace(/\s+\]/g,"]")
        //normalize spaces around commas to single space after comma
        .replace(/\s*,\s*/g, ",")
        )
        .filter((line)=> line.length >0)
        .join("\n");

    }
    const checkIfTestsPassed = (actualOutput,expectedOutput) => { 
        const normalizedActual = normalizeOutput(actualOutput)
        const normalizedExpected = normalizeOutput(expectedOutput)
        return normalizedActual === normalizedExpected
    }
    const handleRunCode =async  () => { 
        setIsRunning(true)
        setOutput(null)

        const result = await executeCode(selectedLanguage,code)
        setOutput(result);
        setIsRunning(false)

        //check if code executed successfully and matches expected output

        if(result.success ){
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
            const testsPassed =checkIfTestsPassed(result.output,expectedOutput)

          if(testsPassed){
            triggerConfetti();
            toast.success("All the tests passed! Greate Job!")
          }else{
            toast.error("Tests failed.Check your output")
          }
        }else{
            toast.error("Code execution failed")
        }
    }

    

    

    return (
          <div className="h-screen w-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* LEFT–RIGHT SPLIT */}
        <Group direction="horizontal">
          {/* LEFT PANEL */}
          <Panel defaultSize={40} minSize={25}>
            <ProblemDescription problem={currentProblem} currentProblemId={currentProblemId} onProblemChange ={handleProblemChange} allProblems= {Object.values(PROBLEMS)} />
          </Panel>

          <Separator className="w-2 bg-base-300 hover:bg-primary cursor-col-resize" />

          {/* RIGHT PANEL */}
          <Panel defaultSize={60} minSize={30}>
            {/* TOP–BOTTOM SPLIT */}
            <Group direction="vertical">
              {/* CODE EDITOR */}
              <Panel defaultSize={70} minSize={40}>
                <CodeEditorPanel
                  code={code}
                  onCodeChange = {setCode}
                  onRunCode = {handleRunCode}
                  isRunning={isRunning}
                  selectedLanguage={selectedLanguage}
                  onLanguageChange = {handleLanguageChange}
                  
                />
              </Panel>
                <Separator className="h-2 bg-base-300 hover:bg-primary cursor-row-resize" />

              {/* OUTPUT PANEL (VERTICALLY RESIZABLE) */}
              <Panel defaultSize={30} minSize={20}>
                <OutputPanel output={output} isRunning={isRunning} />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
    )
}

export default ProblemPage