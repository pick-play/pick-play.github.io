import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          시행일: 2024년 1월 1일 &nbsp;|&nbsp; 최종 수정일: 2024년 1월 1일
        </p>

        <p className="mb-6 leading-relaxed">
          PickPlay(이하 &quot;서비스&quot;)는 사용자의 개인정보를 소중하게 생각합니다. 본 개인정보처리방침은 PickPlay가 운영하는 웹사이트(https://pick-play.github.io/)에서 수집하는 정보의 종류, 수집 방법, 이용 목적, 그리고 사용자의 권리에 대해 설명합니다. 본 서비스를 이용함으로써 아래의 개인정보처리방침에 동의하시는 것으로 간주합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. 수집하는 정보</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 회원가입 절차가 없으므로, 이름·이메일·전화번호 등의 개인 식별 정보를 직접 수집하지 않습니다. 다만 서비스 운영 및 광고 제공을 위해 아래와 같은 정보가 자동으로 수집될 수 있습니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>접속 로그 정보:</strong> IP 주소, 브라우저 종류, 운영체제, 방문 페이지, 방문 시각, 이전 방문 페이지 등의 기술적 정보가 서버 로그에 일시적으로 기록될 수 있습니다.</li>
          <li><strong>쿠키(Cookie):</strong> Google AdSense 등 광고 서비스 제공을 위해 쿠키가 사용됩니다. 쿠키는 사용자의 브라우저에 저장되는 소량의 데이터 파일입니다.</li>
          <li><strong>로컬 스토리지(localStorage):</strong> 일부 도구에서 설정 값(예: 다크 모드, 마지막 방문 기록)을 사용자 기기의 로컬 스토리지에 저장합니다. 이 데이터는 서버로 전송되지 않습니다.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. 쿠키 사용</h2>
        <p className="mb-4 leading-relaxed">
          쿠키는 웹사이트가 사용자의 브라우저에 저장하는 소량의 텍스트 파일입니다. PickPlay는 다음과 같은 목적으로 쿠키를 사용합니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>광고 개인화:</strong> Google AdSense는 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를 사용합니다. 이 쿠키는 Google이 관리하며, Google의 광고 쿠키 정책이 적용됩니다.</li>
          <li><strong>사용자 설정 저장:</strong> 다크 모드 설정, 언어 설정 등 사용자 환경 설정을 유지하기 위해 쿠키 또는 로컬 스토리지를 사용할 수 있습니다.</li>
        </ul>
        <p className="mb-4 leading-relaxed">
          브라우저 설정을 통해 쿠키 수신을 거부하거나 삭제할 수 있습니다. 단, 쿠키를 비활성화하면 일부 서비스 기능이 정상적으로 작동하지 않을 수 있습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. 제3자 광고 서비스 (Google AdSense)</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 Google AdSense를 통해 광고를 게재합니다. Google AdSense는 제3자 광고 서비스로, PickPlay의 개인정보처리방침이 아닌 Google의 개인정보 보호정책이 적용됩니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Google AdSense는 DoubleClick 쿠키를 포함한 쿠키를 사용하여 사용자에게 맞춤형 광고를 표시합니다.</li>
          <li>Google이 광고 쿠키를 사용하는 방식에 대한 자세한 내용은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google 개인정보 보호정책</a>을 참고하세요.</li>
          <li>사용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google 광고 설정</a> 페이지에서 맞춤형 광고를 비활성화할 수 있습니다.</li>
          <li>광고 파트너는 쿠키 및 유사 기술을 사용하여 사용자의 방문 기록, 관심사, 인구통계 정보를 수집할 수 있습니다.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. 사용자 데이터 처리</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 서버에 사용자의 개인 데이터를 저장하지 않습니다. 도구를 사용할 때 입력하는 정보(계산기 수치, 게임 설정, 업로드 파일 등)는 모두 사용자의 브라우저 내에서만 처리되며, 외부 서버로 전송되거나 저장되지 않습니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>PDF 및 이미지 파일:</strong> 업로드된 파일은 외부 서버로 전송되지 않고 브라우저 내 WebAssembly 기술로 처리됩니다.</li>
          <li><strong>계산기 입력값:</strong> 대출, 연봉, 세금 등 계산기에 입력하는 수치는 서버로 전송되지 않습니다.</li>
          <li><strong>게임 데이터:</strong> 파티 게임, 아케이드 게임의 점수 및 설정은 로컬 기기에만 저장됩니다.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. 아동 개인정보 보호</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 만 13세 미만 아동을 대상으로 하는 서비스가 아닙니다. 저희는 의도적으로 만 13세 미만 아동의 개인정보를 수집하지 않습니다. 만약 만 13세 미만 아동의 개인정보가 수집되었음을 발견하신 경우, 즉시 <a href="mailto:pickplay.tools@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">pickplay.tools@gmail.com</a>으로 연락해 주시면 해당 정보를 삭제하겠습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. 정보 보안</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 수집된 정보를 보호하기 위해 기술적, 관리적 보안 조치를 시행합니다. 웹사이트는 HTTPS를 통해 암호화된 연결로 제공되며, 서버에 저장되는 사용자 개인 정보가 없으므로 데이터 유출 위험이 최소화되어 있습니다. 그러나 인터넷을 통한 전송이나 전자 저장 방식은 100% 안전하지 않을 수 있으며, 완전한 보안을 보장할 수 없음을 알려드립니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. 외부 링크</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 외부 웹사이트로 연결되는 링크를 포함할 수 있습니다. 이러한 외부 사이트는 PickPlay의 개인정보처리방침과는 별개의 정책을 가지고 있으며, 당사는 외부 사이트의 개인정보 처리 방침에 대해 책임을 지지 않습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. 개인정보처리방침의 변경</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 법령이나 서비스의 변경 사항을 반영하기 위해 본 개인정보처리방침을 수시로 업데이트할 수 있습니다. 중요한 변경이 있을 경우, 변경된 방침을 이 페이지에 게시하고 시행일을 업데이트합니다. 정기적으로 이 페이지를 확인하여 최신 방침을 확인하시기 바랍니다. 변경 후에도 서비스를 계속 이용하시면 변경된 방침에 동의하는 것으로 간주합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. 연락처</h2>
        <p className="mb-4 leading-relaxed">
          개인정보처리방침에 관한 질문이나 요청이 있으신 경우 아래로 연락해 주세요.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>이메일: <a href="mailto:pickplay.tools@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">pickplay.tools@gmail.com</a></li>
          <li>GitHub: <a href="https://github.com/pick-play" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/pick-play</a></li>
        </ul>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            관련 페이지:{" "}
            <Link href="/terms/" className="text-blue-600 dark:text-blue-400 hover:underline">이용약관</Link>
            {" "}·{" "}
            <Link href="/about/" className="text-blue-600 dark:text-blue-400 hover:underline">소개</Link>
            {" "}·{" "}
            <Link href="/contact/" className="text-blue-600 dark:text-blue-400 hover:underline">연락처</Link>
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">시행일: 2024년 1월 1일</p>
        </div>
      </div>
    </div>
  );
}
