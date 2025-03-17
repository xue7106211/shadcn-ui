"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (chars === "") {
      alert("请至少选择一个选项！");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>密码生成器</CardTitle>
          <CardDescription>生成安全的随机密码</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">密码长度: {length}</label>
            </div>
            <Slider
              value={[length]}
              onValueChange={(value: number[]) => setLength(value[0])}
              min={8}
              max={32}
              step={1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked: boolean) =>
                  setOptions({ ...options, uppercase: checked })
                }
              />
              <label htmlFor="uppercase" className="text-sm font-medium">
                包含大写字母
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(checked: boolean) =>
                  setOptions({ ...options, lowercase: checked })
                }
              />
              <label htmlFor="lowercase" className="text-sm font-medium">
                包含小写字母
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(checked: boolean) =>
                  setOptions({ ...options, numbers: checked })
                }
              />
              <label htmlFor="numbers" className="text-sm font-medium">
                包含数字
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(checked: boolean) =>
                  setOptions({ ...options, symbols: checked })
                }
              />
              <label htmlFor="symbols" className="text-sm font-medium">
                包含特殊字符
              </label>
            </div>
          </div>

          <div className="flex space-x-2">
            <Input
              type="text"
              value={password}
              readOnly
              placeholder="生成的密码将显示在这里"
            />
            <Button onClick={generatePassword}>生成</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
