#!/bin/bash

set -e

function genenv() {

	# Keyboard Input
	read -p 'Input 42API Client ID: '     FORTY_TWO_CLIENT_ID
	read -p 'Input 42API Client Secret: ' FORTY_TWO_CLIENT_SECRET
	read -p 'Input Database User: '       POSTGRES_USER

	# Random Generate
	NEXTAUTH_SECRET=`openssl rand -base64 32`
	POSTGRES_PASSWORD=`openssl rand -base64 8`

	if [ -n "$FORTY_TWO_CLIENT_ID" -a -n "$FORTY_TWO_CLIENT_SECRET" -a -n "$POSTGRES_USER" -a -n "$NEXTAUTH_SECRET" -a -n "$POSTGRES_PASSWORD" ]
	then

		cat <<- EOF > .env
		#general
		TAG=42
		COMPOSE_PROJECT_NAME=ft_trans

		#frontend
		NEXT_PUBLIC_API_URL=http://backend:5000

		NEXTAUTH_SECRET=$NEXTAUTH_SECRET
		NEXTAUTH_URL=http://localhost:3000

		FORTY_TWO_CLIENT_ID=$FORTY_TWO_CLIENT_ID
		FORTY_TWO_CLIENT_SECRET=$FORTY_TWO_CLIENT_SECRET

		#backend

		#db
		DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/mydb?schema=public"

		POSTGRES_USER=$POSTGRES_USER
		POSTGRES_PASSWORD=$POSTGRES_PASSWORD
		POSTGRES_DB=mydb
		EOF

		echo 'Generated .env'

		cat <<- EOF > .envrc
		dotenv

		export NEXT_PUBLIC_API_URL=http://localhost:5000
		export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/mydb?schema=public"
		EOF

		echo 'Generated .envrc'

	else

		echo 'ILLEGAL Input. Aborting.'
		exit 1

	fi
}

genenv
