# Sparkling Saturdays

Static HTML/CSS/JS website for Sparkling Saturdays.

## Booking form

The booking form submits via AJAX to Formspree form `mdeazdkv`:

`https://formspree.io/f/mdeazdkv`

Form notifications should be configured in Formspree to deliver to `zoe@sparklingsaturdays.co.uk`.

The form remains on-page after submission and shows a success or error message.

## Local development

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
