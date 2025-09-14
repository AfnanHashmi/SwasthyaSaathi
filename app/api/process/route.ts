import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type || !['predict', 'forecast', 'all'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    const pyDir = path.join(process.cwd(), 'py');
    
    if (type === 'predict' || type === 'all') {
      await runPythonScript(path.join(pyDir, 'predict.py'));
    }
    
    if (type === 'forecast' || type === 'all') {
      await runPythonScript(path.join(pyDir, 'forecasting.py'));
    }

    return NextResponse.json({ 
      message: `${type} processing completed successfully` 
    });
  } catch (error) {
    console.error('Error processing data:', error);
    return NextResponse.json({ 
      error: 'Failed to process data' 
    }, { status: 500 });
  }
}

function runPythonScript(scriptPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', [scriptPath]);
    let output = '';
    let error = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed: ${error}`));
      } else {
        resolve(output);
      }
    });
  });
}