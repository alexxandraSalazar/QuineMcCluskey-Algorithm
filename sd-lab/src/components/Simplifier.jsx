"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { InfoIcon } from "lucide-react";
import { TableGeneration } from "./TableGeneration";

export default function BooleanSimplifier() {
  const [variables, setVariables] = useState("4");
  const [minterms, setMinterms] = useState("");
  const [result, setResult] = useState("");
  const [tableMccausky, setTableMccausky] = useState(false);

  const handleSimplify = () => {
    // Here implementation or call Quine-McCluskey algorithm
    setResult(
      `Simplified expression for minterms [${minterms}] with ${variables} variables`
    );
    setTableMccausky(true);
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute top-4 right-4 z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-white border-gray-200 hover:bg-gray-100"
            >
              <InfoIcon className="h-4 w-4 text-gray-800" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                Información del Proyecto
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4 text-center">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Sistemas Digitales</h3>
                <p>Laboratorio II</p>
                <p className="font-medium">Prof. Ing. Marvin Castañeda</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-medium">Grupo 3-T1-Co</h4>
                <p className="text-sm text-muted-foreground">Presentado por:</p>
                <ul className="space-y-1 text-sm list-none p-0">
                  <li>Alexandra Daniela Rodríguez Salazar (2023-0613U)</li>
                  <li>Alexa Nicolle Reynosa (2022-0883U)</li>
                  <li>Didier Youssef Martinez Montenegro (2023-0610U)</li>
                  <li>Kelvin Isaías Alemán Narváez (2023-0699U)</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main card component */}
      <div className="flex justify-center items-center pt-16 px-4">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="bg-gradient-to-r rounded-t-lg">
            <CardTitle className="text-2xl text-gray-800">
              Boolean Expression Simplifier
            </CardTitle>
            <CardDescription>
              Simplify Boolean expressions using the Quine-McCluskey algorithm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="variables" className="font-medium">
                Number of Variables
              </Label>
              <Select value={variables} onValueChange={setVariables}>
                <SelectTrigger id="variables" className="w-full">
                  <SelectValue placeholder="Select number of variables" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Variables</SelectItem>
                  <SelectItem value="3">3 Variables</SelectItem>
                  <SelectItem value="4">4 Variables</SelectItem>
                  <SelectItem value="5">5 Variables</SelectItem>
                  <SelectItem value="6">6 Variables</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minterms" className="font-medium">
                Minterms (comma separated)
              </Label>
              <Textarea
                id="minterms"
                placeholder="Enter minterms (e.g., 0,1,4,5,6,7,8,9,15)"
                value={minterms}
                onChange={(e) => setMinterms(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4 pb-6">
            <Button
              onClick={handleSimplify}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Simplify Expression
            </Button>
            {result && (
              <div className="w-full p-4 border rounded-md bg-muted">
                <h3 className="font-medium mb-2">Simplified Result:</h3>
                <p className="font-mono">{result}</p>
                {tableMccausky && (
                  <TableGeneration minterms={minterms} variables={variables} />
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
