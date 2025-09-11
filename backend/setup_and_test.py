#!/usr/bin/env python3
"""
Setup and test script for AI Governance Tool backend
This script will try to install dependencies and test the backend
"""

import subprocess
import sys
import os

def run_command(command, description):
    """Run a command and return success status"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, 
                              capture_output=True, text=True)
        print(f"✅ {description} - Success")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} - Failed: {e}")
        if e.stdout:
            print(f"   stdout: {e.stdout}")
        if e.stderr:
            print(f"   stderr: {e.stderr}")
        return False

def check_python_and_pip():
    """Check if Python and pip are available"""
    print("🔍 Checking Python environment...")
    
    # Check Python
    try:
        result = subprocess.run([sys.executable, "--version"], 
                              capture_output=True, text=True)
        print(f"✅ Python: {result.stdout.strip()}")
    except Exception as e:
        print(f"❌ Python check failed: {e}")
        return False
    
    # Try different pip commands
    pip_commands = [
        "pip --version",
        f"{sys.executable} -m pip --version",
        "python -m pip --version",
        "py -m pip --version"
    ]
    
    for cmd in pip_commands:
        try:
            result = subprocess.run(cmd, shell=True, 
                                  capture_output=True, text=True)
            if result.returncode == 0:
                print(f"✅ Found pip: {cmd}")
                print(f"   Version: {result.stdout.strip()}")
                return cmd.split()[0] if len(cmd.split()) > 2 else cmd.split()[0]
        except:
            continue
    
    print("❌ No working pip command found")
    return False

def install_requirements(pip_cmd):
    """Install required packages"""
    packages = ["flask", "flask-cors", "requests"]
    
    for package in packages:
        cmd = f"{pip_cmd} install {package}"
        if not run_command(cmd, f"Installing {package}"):
            # Try alternative install methods
            alt_commands = [
                f"{sys.executable} -m pip install {package}",
                f"python -m pip install {package}",
                f"py -m pip install {package}"
            ]
            
            success = False
            for alt_cmd in alt_commands:
                if run_command(alt_cmd, f"Installing {package} (alternative)"):
                    success = True
                    break
            
            if not success:
                print(f"❌ Failed to install {package}")
                return False
    
    return True

def test_imports():
    """Test if required modules can be imported"""
    print("🔍 Testing module imports...")
    
    modules = ["flask", "flask_cors", "requests"]
    for module in modules:
        try:
            __import__(module)
            print(f"✅ {module} - OK")
        except ImportError as e:
            print(f"❌ {module} - Failed: {e}")
            return False
    
    return True

if __name__ == "__main__":
    print("🚀 AI Governance Tool Backend Setup")
    print("=" * 50)
    
    # Change to backend directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    print(f"📁 Working directory: {script_dir}")
    
    # Check Python and pip
    pip_cmd = check_python_and_pip()
    if not pip_cmd:
        print("\n❌ Setup failed: pip not available")
        print("Please install pip or use a Python environment with pip")
        sys.exit(1)
    
    # Install requirements
    if not install_requirements(pip_cmd):
        print("\n❌ Setup failed: could not install requirements")
        sys.exit(1)
    
    # Test imports
    if not test_imports():
        print("\n❌ Setup failed: modules not importable")
        sys.exit(1)
    
    print("\n✅ Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Run the backend: python app.py")
    print("2. Test the backend: python test_backend.py")
    print("3. Open your frontend and test the integration")
    print("\n🔧 Backend will run on: http://localhost:5000")