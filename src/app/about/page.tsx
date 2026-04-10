import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">PickPlay 소개</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">

        <h2 className="text-2xl font-semibold mt-8 mb-4">PickPlay란?</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 일상의 선택을 돕는 무료 온라인 도구 모음입니다. 오늘 뭐 먹을지 고민될 때, 친구들과 파티 게임을 즐기고 싶을 때, 대출 이자를 계산해야 할 때 — PickPlay의 42가지 도구가 빠르고 간편하게 도와드립니다. 회원가입도 필요 없고, 앱을 설치할 필요도 없습니다. 브라우저만 있으면 누구나 바로 사용할 수 있습니다.
        </p>
        <p className="mb-4 leading-relaxed">
          2024년에 시작한 PickPlay는 "복잡한 것을 단순하게, 불편한 것을 편리하게"라는 철학 아래 꾸준히 새로운 도구를 추가하고 있습니다. 현재 한국어, 영어, 일본어, 중국어, 스페인어 등 5개 언어로 전 세계 사용자에게 서비스를 제공합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">우리의 미션</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay의 미션은 간단합니다. 누구나 무료로, 회원가입 없이, 광고 없이도 빠르게 사용할 수 있는 실용적인 도구를 제공하는 것입니다. 인터넷에는 수많은 도구가 있지만, 회원가입을 요구하거나, 유료 결제를 요구하거나, 복잡한 UI로 사용하기 어려운 경우가 많습니다. PickPlay는 이런 불편함을 해소하기 위해 만들어졌습니다.
        </p>
        <p className="mb-4 leading-relaxed">
          모든 도구는 설치 없이 웹 브라우저에서 즉시 실행됩니다. 계정을 만들 필요가 없으며, 개인정보를 입력할 필요도 없습니다. 그냥 필요할 때 열고, 사용하고, 닫으면 됩니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">제공 서비스</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">생활 도구</h3>
        <p className="mb-3 leading-relaxed">
          일상생활에서 유용하게 쓸 수 있는 실용 도구들입니다. PDF 합치기·분할·변환, 이미지 압축·변환, QR 코드 생성기, 텍스트 글자 수 세기, 비밀번호 생성기, 단위 변환기 등을 제공합니다. 모든 파일 처리는 브라우저 내에서 이루어지며, 서버에 파일이 전송되거나 저장되지 않습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">파티 게임</h3>
        <p className="mb-3 leading-relaxed">
          친구, 가족, 동료들과 함께 즐길 수 있는 게임 도구입니다. 라이어 게임, 밸런스 게임, 초성 퀴즈, 진실 or 도전, 이상형 월드컵, 조 뽑기, 사다리 타기, 자리 배치, 타로 카드 등 9가지 파티 게임을 제공합니다. 별도의 앱 설치 없이 링크 공유만으로 여러 명이 함께 즐길 수 있습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">아케이드 게임</h3>
        <p className="mb-3 leading-relaxed">
          가볍게 즐길 수 있는 미니 게임들입니다. 반응속도 테스트, 타이핑 테스트, 기억력 게임, 색상 맞추기, 색깔 테스트, 에이밍 테스트 등 6가지 아케이드 게임이 있습니다. 자신의 반응속도나 인지 능력을 재미있게 측정해 볼 수 있습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">금융 계산기</h3>
        <p className="mb-3 leading-relaxed">
          복잡한 금융 계산을 쉽게 도와주는 계산기들입니다. 대출 이자 계산기, 복리 계산기, 연봉 실수령액 계산기, 퇴직금 계산기, 부동산 취득세 계산기, 환율 계산기, 백분율 계산기 등 7가지 금융 계산기를 제공합니다. 결과는 참고용이며, 정확한 금융 결정은 전문가와 상담하시기 바랍니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">심리 테스트</h3>
        <p className="mb-3 leading-relaxed">
          재미있는 심리 테스트와 성격 유형 검사를 제공합니다. MBTI 유형 검사, 테토 vs 에겐 테스트, 커플 궁합 테스트, 커플 닉네임 생성기, 타로 카드 운세 등이 있습니다. 과학적 근거보다는 오락 목적으로 만들어진 도구들입니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">개인정보 보호</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 사용자의 개인정보를 소중히 여깁니다. 서버에 개인 데이터를 저장하지 않으며, 모든 계산과 처리는 사용자의 브라우저에서 직접 이루어집니다. 업로드한 파일은 외부 서버로 전송되지 않습니다. 광고 제공을 위해 Google AdSense 쿠키가 사용될 수 있으며, 자세한 내용은{" "}
          <Link href="/privacy/" className="text-blue-600 dark:text-blue-400 hover:underline">
            개인정보처리방침
          </Link>
          을 확인해 주세요.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">오픈소스</h2>
        <p className="mb-4 leading-relaxed">
          PickPlay는 오픈소스 프로젝트입니다. 소스 코드는{" "}
          <a
            href="https://github.com/pick-play"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub (github.com/pick-play)
          </a>
          에서 누구나 확인할 수 있습니다. 버그를 발견하셨거나, 새로운 기능을 제안하고 싶으신 분은 GitHub 이슈 또는 이메일로 연락해 주세요. 기여를 환영합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">연락처</h2>
        <p className="mb-4 leading-relaxed">
          서비스에 대한 문의, 버그 신고, 기능 제안은 아래 채널을 통해 언제든지 연락해 주세요.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>이메일: <a href="mailto:pickplay.tools@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">pickplay.tools@gmail.com</a></li>
          <li>GitHub: <a href="https://github.com/pick-play" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/pick-play</a></li>
          <li>자세한 문의: <Link href="/contact/" className="text-blue-600 dark:text-blue-400 hover:underline">연락처 페이지</Link> 참고</li>
        </ul>

        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          마지막 업데이트: 2024년 1월 1일
        </p>
      </div>
    </div>
  );
}
