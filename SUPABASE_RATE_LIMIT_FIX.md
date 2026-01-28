# How to Fix "Email Rate Limit Exceeded" in Supabase

The error "Email rate limit exceeded" (HTTP 429) occurs because Supabase has strict default security limits to prevent abuse. This often happens during development when testing signups repeatedly.

## Option 1: Increase Rate Limits (Recommended for Development)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project (**workshop**).
3. Navigate to **Authentication** > **Rate Limits** (in the Configuration section on the left).
   - *Note: In some versions, this is under `Project Settings` > `Auth` > `Rate Limits`.*
4. Adjust the following settings:
   - **Email rate limit**: The number of emails that can be sent to a *single address* per hour. Default is usually ~3. Increase this to `30` or `100` for testing.
   - **Signups rate limit**: The number of new signups allowed from a *single IP address* per hour. Default is ~30. Increase if you are testing multiple accounts from the same network.
5. Click **Save**.

## Option 2: Use Custom SMTP (Recommended for Production)

Supabase's built-in email service has strict limits to prevent spam. For a production app, you should use a custom SMTP provider (like Resend, SendGrid, AWS SES).

1. Go to **Project Settings** > **Auth** > **SMTP Settings**.
2. Enable "Enable Custom SMTP".
3. Enter your SMTP provider details.
   - **Resend** is excellent for Supabase (and has a free tier).
4. Limits will then be determined by your SMTP provider, not Supabase's default service.

## Option 3: Use "Plus" Addressing for Testing
If you don't want to change settings, you can test with unique emails using the `+` trick:
- `yourname+test1@gmail.com`
- `yourname+test2@gmail.com`
- `yourname+test3@gmail.com`

These are treated as unique users but all emails go to your main inbox (`yourname@gmail.com`).
