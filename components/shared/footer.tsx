import dayjs from "dayjs";

export default function Footer() {
  return (
    <footer className="text-center py-8">
      &copy; Sarthak Agarwal {dayjs().format("YYYY")}
    </footer>
  );
}
