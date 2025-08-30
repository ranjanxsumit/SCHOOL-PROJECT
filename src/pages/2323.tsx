import Link from "next/link";

export default function Home() {
  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "sans-serif"
    }}>
      <h1>Welcome to the School Directory</h1>
      <p>You can add a school or view all schools.</p>
      <div style={{ marginTop: "20px" }}>
        <Link href="/addSchool" style={{ marginRight: "15px" }}>
          Add School
        </Link>
        <Link href="/showSchools">
          View Schools
        </Link>
      </div>
    </div>
  );
}
