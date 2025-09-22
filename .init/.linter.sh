#!/bin/bash
cd /tmp/kavia/workspace/code-generation/smart-cooking-assistant-6315-6302/cooking_assistant_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

