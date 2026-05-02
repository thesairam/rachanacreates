export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-bg2">
      <div className="container-x py-4 flex flex-wrap items-center justify-between gap-2 text-muted text-sm">
        <div>© {year} Henna By Rachana</div>
        <div>Crafted with love and mehndi.</div>
      </div>
    </footer>
  )
}
